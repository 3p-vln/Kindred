import { getElement, getElements, renderElement } from '../composables/use-call-dom.ts';
import { doc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import { ActualProd, Payments, Product, User } from '../../typings/interfaces.ts';
import { db, storage } from '../modules/firebace.ts';
import { getCurrentUsers } from '../composables/requests.ts';
import { done } from './done-pop-up.ts';
import { ref, deleteObject } from 'firebase/storage';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

export async function renderAllOrders(allProds: Product[], allUsers: User[], payments: Payments[]) {
  const container = getElement('.all-orders__content');
  if (!container) return;

  const actualProd: ActualProd[] = [];

  const docRef = await getCurrentUsers(storedUserInfo.id);
  const userProd: string[] = docRef?.myProds;
  const userRole: string = docRef?.role;

  if ((!userProd || userProd.length === 0) && userRole !== 'admin') {
    container.innerHTML = 'Ви не створювали зборів.';
    return;
  }

  const usersMap = new Map(allUsers.map((u) => [u.id, u]));
  const prodsMap = new Map(allProds.map((p) => [p.id, p]));

  if (userRole === 'volunteer') {
    for (const prodId of userProd) {
      const prod = prodsMap.get(prodId);
      if (!prod) continue;

      const user = usersMap.get(prod.userId);
      let userScore = 0;

      if (!user) return;

      user.score.forEach((sc) => {
        userScore += Number(sc);
      });

      const totalScore = userScore / user.score.length;

      actualProd.push({
        id: prod.id,
        img: prod.img,
        title: prod.title,
        goal: prod.goal,
        collected: prod.collected,
        userInfo: {
          id: user.id || '',
          name: `${user.name || '—'}`,
          surname: user.surname || '',
          score: Math.round(totalScore),
        },
        date: prod.date,
      });
    }
  }

  if (userRole === 'admin') {

    for (const prod of allProds) {
      const user = usersMap.get(prod.userId);
      let userScore = 0;

      if (!user) return;

      user.score.forEach((sc) => {
        userScore += Number(sc);
      });

      const totalScore = userScore / user.score.length;

      actualProd.push({
        id: prod.id,
        img: prod.img,
        title: prod.title,
        goal: prod.goal,
        collected: prod.collected,
        userInfo: {
          id: prod.userId,
          name: `${user?.name || '—'}`,
          surname: user?.surname || '',
          score: Math.round(totalScore) || 0,
        },
        date: prod.date,
      });
    }
  }

  container.innerHTML = '';
  const sortedProds = actualProd.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  sortedProds.forEach((prod) => {
    renderCard(prod, container, allUsers, payments);
  });
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function renderCard(prod: ActualProd, container: HTMLElement, allUsers: User[], payments: Payments[]) {
  const prodCard = renderElement('div', ['prod', `prod_${prod.id}`]);

  const card = renderElement<HTMLAnchorElement>('a', ['prod__card', 'card', `card_${prod.id}`]);
  card.href = `prod.html?id=${prod.id}`;

  const cardImg = renderElement('div', 'card__img');
  cardImg.innerHTML = `
    <img src="${prod.img}" alt="${prod.title}"/>
  `;

  const cardInfo = renderElement('div', 'card__info');

  const cardTitle = renderElement('div', 'card__title');
  cardTitle.innerText = prod.title;

  const cardGoal = renderElement('div', 'card__goal');
  cardGoal.innerHTML = `Мета: <span>${prod.goal}</span> грн.`;

  const cardCollected = renderElement('div', 'card__collected');
  cardCollected.innerHTML = `Зібрано: <span>${prod.collected}</span> грн.`;

  const progressBar = renderElement('div', ['card__progress-bar', 'progress-bar']);
  const progress = renderElement('div', 'progress-bar__progress');
  progress.style.width = (prod.collected * 100) / prod.goal + '%';

  progressBar.appendChild(progress);

  const cardUser = renderElement('div', 'card__user');

  const cardUserFIO = renderElement('div', 'card__user-fio');
  cardUserFIO.innerHTML = `Волонтер: <span>${prod.userInfo.surname} ${prod.userInfo.name ? prod.userInfo.name.charAt(0).toUpperCase() + '.' : ''}</span>`;

  const cardUserScore = renderElement('div', 'card__user-score');
  cardUserScore.innerHTML = `
    ${prod.userInfo.score} 
    <svg>
        <use href="#star"></use>
    </svg>`;

  const changeProd = renderElement<HTMLAnchorElement>('a', ['card__change-prod', 'card__btn', 'btn', 'btn_yellow']);
  changeProd.innerText = 'Редагувати';
  changeProd.href = `prod.html?id=${prod.id}`;

  const removeProd = renderElement('button', ['card__remove-prod', 'card__btn', 'btn', 'btn_red']);
  removeProd.innerText = 'Видалити';

  removeProd.addEventListener('click', async () => {
    await removeProds(prod, allUsers, payments);
    afterRemove(container);
  });

  const closeProd = renderElement('button', ['card__close-prod', 'card__btn', 'btn', 'btn_green']);
  closeProd.innerText = 'Закрити';
  closeProd.addEventListener('click', async () => {
    await closeProduct(prod.id);
    done('закрито');
  });

  cardUser.appendChild(cardUserFIO);
  cardUser.appendChild(cardUserScore);

  cardInfo.append(cardTitle);
  cardInfo.append(cardGoal);
  cardInfo.append(cardCollected);
  cardInfo.append(progressBar);
  cardInfo.append(cardUser);

  card.append(cardImg);
  card.append(cardInfo);

  prodCard.appendChild(card);
  prodCard.appendChild(changeProd);
  prodCard.appendChild(closeProd);
  prodCard.appendChild(removeProd);

  container.appendChild(prodCard);
}

async function closeProduct(prodId: string) {
  try {
    const docRef = doc(db, 'prods', prodId);
    await updateDoc(docRef, {
      status: true,
    });
  } catch (error) {
    console.error(error);
  }
}

async function removeProduct(prodId: string) {
  try {
    const docRef = doc(db, 'prods', prodId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

async function removeProds(prod: ActualProd, allUsers: User[], payments: Payments[]) {
  try {
    const decodeUrl = decodeURIComponent(prod.img);
    const filePath = decodeUrl.split('/o/')[1].split('?')[0];
    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    await removeProduct(prod.id);

    for (let i = 0; i < allUsers.length; i++) {
      const myProds: string[] = allUsers[i].myProds || [];
      const supportedProds = allUsers[i].supportedProds || [];
      const userRef = doc(db, 'users', prod.userInfo.id);

      if (myProds.includes(prod.id)) {
        await updateDoc(userRef, {
          myProds: arrayRemove(prod.id),
        });
      }

      if (supportedProds.includes(prod.id)) {
        await updateDoc(userRef, {
          supportedProds: arrayRemove(prod.id),
        });
      }
    }

    for (let i = 0; i < payments.length; i++) {
      const payRef = doc(db, 'payments', payments[i].id);

      if (payments[i].prodId === prod.id) {
        await updateDoc(payRef, {
          status: 'remove',
        });
      }
    }

    getElements(`.prod_${prod.id}`)?.forEach((prod) => {
      prod.remove();
    });
  } catch (error) {
    console.error(error);
  }
}

function afterRemove(container: HTMLElement) {
  if (getElements('.all-orders__content .prod').length === 0) {
    container.innerHTML = '';
    container.innerHTML = 'Ви не створювали зборів.';

    if (getElements('.my-orders__content .prod').length === 0) {
      const myOrders = getElement('.my-orders__content');
      if (!myOrders) return;

      myOrders.innerHTML = '';
      myOrders.innerHTML = 'Ви не брали участі у зборах.';
    }

    if (getElements('.payments__content .pay').length === 0) {
      const myPayments = getElement('.payments__content');
      if (!myPayments) return;

      myPayments.innerHTML = '';
      myPayments.innerHTML = 'Донати відстні.';
    }
  }
}
