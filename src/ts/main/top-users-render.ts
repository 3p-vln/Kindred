import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { Product, TopUser, User } from '../../typings/interfaces.ts';

export async function renderUsersCards(containerName: string, allUsers: User[], allProd: Product[]) {
  const container = getElement(containerName);
  const topUsers: TopUser[] = [];

  if (!container) return;

  allUsers.forEach((user) => {
    const totalScore = user.score.reduce((sum, sc) => sum + Number(sc), 0) / user.score.length;

    const userTop = {
      id: user.id,
      img: user.img,
      name: user.name,
      surname: user.surname,
      allCollections: user.myProds.length,
      succsesfulCollections: 0,
      dateOfRegister: user.dateOfRegister,
      score: Math.round(totalScore),
    };

    user.myProds.forEach((prod) => {
      allProd.forEach((product) => {
        if (product.id === prod && product.status) userTop.succsesfulCollections++;
      });
    });

    if (userTop.succsesfulCollections !== 0 && userTop.allCollections !== 0) topUsers.push(userTop);
  });

  topUsers.sort((a, b) => {
    if (a.succsesfulCollections === b.succsesfulCollections) return b.score - a.score;

    return b.succsesfulCollections - a.succsesfulCollections;
  });

  const topFiveUsers = topUsers.slice(0, 6);

  topFiveUsers.forEach((user) => {
    renderUserCards(user, container);
  });
}

function renderUserCards(user: TopUser, container: HTMLElement) {
  const userCard = renderElement<HTMLAnchorElement>('a', ['user', `user_${user.id}`]);
  userCard.href = `user.html?id=${user.id}`;

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

  container.appendChild(userCard);
}
