import { getElement, getElements, renderElement } from '../composables/use-call-dom.ts';
import { Application, Payments, Product, User, UserCard } from '../../typings/interfaces.ts';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { done } from './done-pop-up.ts';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

export async function renderAllUsers(allUsers: User[], allProd: Product[], allPayments: Payments[], allApplications: Application[]) {
  const container = getElement('.users__content');
  const topUsers: UserCard[] = [];

  if (!container) return;

  allUsers.forEach((user) => {
    const userTop = {
      id: user.id,
      img: user.img,
      name: user.name,
      surname: user.surname,
      allCollections: user.myProds.length,
      succsesfulCollections: 0,
      dateOfRegister: user.dateOfRegister,
      role: user.role,
      allProducts: user.myProds,
    };

    user.myProds.forEach((prod) => {
      allProd.forEach((product) => {
        if (product.id === prod && product.status) userTop.succsesfulCollections++;
      });
    });

    if (userTop.id !== storedUserInfo.id) {
      topUsers.push(userTop);
    }
  });

  const sortUser = topUsers.sort((a, b) => parseDate(b.dateOfRegister).getTime() - parseDate(a.dateOfRegister).getTime());

  sortUser.forEach((user) => {
    renderUserCards(user, container, allPayments, allApplications);
  });
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function renderUserCards(user: UserCard, container: HTMLElement, allPayments: Payments[], applications: Application[]) {
  const userChange = renderElement('div', ['user-card', `user-card_${user.id}`]);

  const userCard = renderElement<HTMLAnchorElement>('a', ['user', `user_${user.id}`]);
  userCard.href = `user.html?id=${user.id}`

  const userImg = renderElement('div', 'user__img');
  userImg.innerHTML = `
     <img src="${user.img}" alt="${user.name}"/>
  `;

  const userInfo = renderElement('div', 'user__info');

  const userNameSurname = renderElement('div', 'user__name');
  userNameSurname.innerText = `${user.name} ${user.surname}`;

  const userAll = renderElement('div', 'user__all');
  userAll.innerText = `Кількість зборів: ${user.allCollections}`;

  const userSuccsesful = renderElement('div', 'user__succsesful');
  userSuccsesful.innerText = `Успішних зборів: ${user.succsesfulCollections}`;

  const userRegDate = renderElement('div', 'user__reg-date');
  userRegDate.innerText = `На сайті з ${user.dateOfRegister}`;

  userInfo.appendChild(userNameSurname);
  userInfo.appendChild(userAll);
  userInfo.appendChild(userSuccsesful);
  userInfo.appendChild(userRegDate);

  userCard.appendChild(userImg);
  userCard.appendChild(userInfo);

  const userOperation = renderElement('div', ['user-card__operation', 'operation']);

  const userRole = renderElement('div', ['operation__role', 'role']);
  userRole.innerHTML = `
            <p>Роль: </p>
            <form id="form-${user.id}">
              <label class="role__radio" for="admin-${user.id}">
                <input type="radio" id="admin-${user.id}" name="role${user.id}" ${user.role === 'admin' ? 'checked' : ''}>
  
                <span class="custom-radio"></span>
  
                Адмін
              </label>
  
              <label class="role__radio" for="volunteer-${user.id}">
                <input type="radio" id="volunteer-${user.id}" name="role${user.id}" ${user.role === 'volunteer' ? 'checked' : ''}>
  
                <span class="custom-radio"></span>
  
                Волонтер
              </label>
  
              <label class="role__radio" for="user-${user.id}">
                <input type="radio" id="user-${user.id}" name="role${user.id}" ${user.role === 'customer' ? 'checked' : ''}>
  
                <span class="custom-radio"></span>
  
                Звич. користувач
              </label>
            </form>
  `;

  const btns = renderElement('div', 'operation__btns');

  const changeBtn = renderElement('button', ['operation__btn', 'btn', 'btn_yellow']);
  changeBtn.innerText = 'Зберегти';
  changeBtn.addEventListener('click', async () => {
    await change(user);
    done('');
  });

  const removeBtn = renderElement('button', ['operation__btn', 'btn', 'btn_red']);
  removeBtn.innerText = 'Видалити';
  removeBtn.addEventListener('click', async () => {
    await removeUser(user, allPayments, applications);
  });

  btns.appendChild(changeBtn);
  btns.appendChild(removeBtn);

  userOperation.appendChild(userRole);
  userOperation.appendChild(btns);

  userChange.appendChild(userCard);
  userChange.appendChild(userOperation);

  container.appendChild(userChange);
}

async function removeUser(user: UserCard, allPayments: Payments[], applications: Application[]) {
  try {
    for (const product of user.allProducts) {
      const usersProdRef = doc(db, 'prods', product);
      await deleteDoc(usersProdRef);

      for (const pay of allPayments) {
        if (pay.prodId === product || pay.userId === user.id) {
          const payRef = doc(db, 'payments', pay.id);
          await deleteDoc(payRef);
        }
      }

      for (const application of applications) {
        if(application.userId === user.id) {
          const applicationRef = doc(db, 'applications', application.id);
          await deleteDoc(applicationRef);
        }
      }
    }

    const userRef = doc(db, 'users', user.id);
    await deleteDoc(userRef);

    getElement(`.user-card_${user.id}`)?.remove();
    getElements(`.application_${user.id}`).forEach((el) => {
      el.remove();
    })

    if(getElements(`.application`).length === 0) {
      const applContainer = getElement('.volonteer-application__content');

      if(applContainer) {
        applContainer.innerText = 'Заявки відсутні.'
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function change(user: UserCard) {
  const adminRadio = getElement<HTMLInputElement>(`#admin-${user.id}`);
  const volunteerRadio = getElement<HTMLInputElement>(`#volunteer-${user.id}`);
  const userRadio = getElement<HTMLInputElement>(`#user-${user.id}`);

  try {
    const userRef = doc(db, 'users', user.id);

    if(adminRadio?.checked) {
      await updateDoc(userRef, {
        role: 'admin'
      })
    }

    if(volunteerRadio?.checked) {
      await updateDoc(userRef, {
        role: 'volunteer'
      })
    }

    if(userRadio?.checked) {
      await updateDoc(userRef, {
        role: 'customer'
      })
    }
  } catch (error) {
    console.error(error);
  }
}
