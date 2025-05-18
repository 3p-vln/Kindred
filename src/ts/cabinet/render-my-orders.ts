import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { ActualProd, Product, User } from '../../typings/interfaces.ts';
import { getCurrentUsers } from '../composables/requests.ts';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

export async function renderMyOrders(allProds: Product[], allUsers: User[]) {
  const container = getElement('.my-orders__content');
  const actualProd: ActualProd[] = [];

  const docRef = await getCurrentUsers(storedUserInfo.id);
  const userProd: string[] = Array.isArray(docRef?.supportedProds) ? docRef.supportedProds : [];

  if (!container) return;

  if (!userProd || userProd.length === 0) {
    container.innerHTML = 'Ви не брали участі у зборах.';
    return;
  }

  const usersMap = new Map(allUsers.map((u) => [u.id, u]));
  const prodsMap = new Map(allProds.map((p) => [p.id, p]));

  userProd.forEach((productId) => {
    const prod = prodsMap.get(productId);
    if (!prod) return;

    const user = usersMap.get(prod.userId);
    if (!user) return;

    let userScore = 0;

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
        id: user.id,
        name: `${user.name?.[0] || '-'}.`,
        surname: user.surname,
        score: Math.round(totalScore),
      },
      date: prod.date,
    });
  });

  container.innerHTML = '';
  actualProd.forEach((prod) => {
    renderCard(prod, container);
  });
}

function renderCard(prod: ActualProd, container: HTMLElement) {
  const prodCard = renderElement('div', ['prod', `prod_${prod.id}`]);

  const card = renderElement<HTMLAnchorElement>('a', ['prod__card', 'card', `card_${prod.id}`]);
  card.href = `prod.html?id=${prod.id}`;

  const cardImg = renderElement('div', 'card__img');
  cardImg.innerHTML = `
    <img src="${prod.img}" alt="${prod.title}"/>
  `;

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

  cardUser.appendChild(cardUserFIO);
  cardUser.appendChild(cardUserScore);

  card.append(cardImg);
  card.append(cardTitle);
  card.append(cardGoal);
  card.append(cardCollected);
  card.append(progressBar);
  card.append(cardUser);

  prodCard.appendChild(card);

  container.appendChild(prodCard);
}
