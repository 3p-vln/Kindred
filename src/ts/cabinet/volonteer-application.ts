import { getElement, getElements, renderElement } from '../composables/use-call-dom.ts';
import { Application, ApplicationInfo, User } from '../../typings/interfaces.ts';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { done } from './done-pop-up.ts';
import { getAllApplications, getAllPayments, getAllProds, getAllUsers } from '../composables/requests.ts';
import { renderAllUsers } from './all-users.ts';

const container = getElement('.volonteer-application__content');

export async function runApplication(applic: Application[], allUsers: User[]) {
  const applicationInfo: ApplicationInfo[] = [];

  applic.forEach((app) => {
    allUsers.forEach((user) => {
      if (user.id === app.userId) {
        applicationInfo.push({
          id: app.id,
          about: app.about,
          city: app.city,
          dateOfBirth: app.date,
          email: app.email,
          userId: app.userId,
          name: app.name,
          surname: app.surname,
          time: app.time,
          dateOfRegister: user.dateOfRegister,
          img: user.img,
          phone: app.phone,
        });
      }
    });
  });

  if (applicationInfo.length === 0 && container) {
    container.innerText = 'Заявки відсутні.';
  }

  applicationInfo.forEach((appl) => {
    renderAllApplications(appl);
  });
}

function renderAllApplications(appl: ApplicationInfo) {
  console.log(container, appl);
  const applicationCard = renderElement('div', ['application', `application_${appl.userId}`]);

  const applImg = renderElement('div', 'application__img');
  applImg.innerHTML = `
    <img src="${appl.img}" alt="${appl.name}"/>
  `;

  const applInfo = renderElement('div', 'application__info');

  const name = renderElement('p', 'application__name');
  name.innerText = appl.name + ' ' + appl.surname;

  const dateReg = renderElement('p', 'application__date-of-reg');
  dateReg.innerText = `На сайті з ${appl.dateOfRegister}`;

  const dateBirth = renderElement('p', 'application__date-birth');
  dateBirth.innerHTML = `
    <span>Дата народження: </span>${appl.dateOfBirth}
  `;

  const city = renderElement('p', 'application__city');
  city.innerHTML = `
    <span>Місто: </span>${appl.city}
  `;

  const phone = renderElement('p', 'application__phone');
  phone.innerHTML = `
    <span>Контактний номер телефону: </span>${appl.phone}
  `;

  const email = renderElement('p', 'application__email');
  email.innerHTML = `
    <span>E-mail: </span>${appl.email}
  `;

  const about = renderElement('p', 'application__about');
  about.innerHTML = `
    <span>Про себе: </span>${appl.about}
  `;

  const time = renderElement('p', 'application__time');
  time.innerHTML = `
    <span>Час який готовий приділяти: </span>${appl.time}
  `;

  const btns = renderElement('button', 'application__btns');

  const removeBtn = renderElement('button', ['application__btn', 'btn', 'btn_red']);
  removeBtn.innerText = 'Відхилити';
  removeBtn.addEventListener('click', async () => {
    await removeApplication(appl);
  });

  const changeBtn = renderElement('button', ['application__btn', 'btn', 'btn_yellow']);
  changeBtn.innerText = 'Змінити роль';
  changeBtn.addEventListener('click', async () => {
    await changeInfo(appl);
    await afterChange();
    done('змінено');
  });

  btns.appendChild(removeBtn);
  btns.appendChild(changeBtn);

  applInfo.appendChild(name);
  applInfo.appendChild(dateReg);
  applInfo.appendChild(dateBirth);
  applInfo.appendChild(city);
  applInfo.appendChild(phone);
  applInfo.appendChild(email);
  applInfo.appendChild(about);
  applInfo.appendChild(time);
  applInfo.appendChild(btns);

  applicationCard.appendChild(applImg);
  applicationCard.appendChild(applInfo);

  if (!container) return;

  container.appendChild(applicationCard);
}

async function removeApplication(appl: ApplicationInfo) {
  try {
    const applRef = doc(db, 'applications', appl.id);
    await deleteDoc(applRef);

    getElement(`.application_${appl.userId}`)?.remove();

    if (getElements(`.application`).length === 0 && container) container.innerText = 'Заявки відсутні.';
  } catch (error) {
    console.error(error);
  }
}

async function changeInfo(appl: ApplicationInfo) {
  const userRef = doc(db, 'users', appl.userId);
  await updateDoc(userRef, {
    role: 'volunteer',
  });

  const applRef = doc(db, 'applications', appl.id);
  await deleteDoc(applRef);

  getElement(`.application_${appl.userId}`)?.remove();

  if (getElements(`.application`).length === 0 && container) container.innerText = 'Заявки відсутні.';
}

async function afterChange() {
  const allUsers = await getAllUsers();
  const allProd = await getAllProds();
  const allPayments = await getAllPayments();
  const applications = await getAllApplications();

  if (!allUsers || !allProd || !allPayments || !applications) return;

  await renderAllUsers(allUsers, allProd, allPayments, applications);
}
