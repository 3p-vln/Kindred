import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { ActualProd, Product, User } from '../../typings/interfaces.ts';

function isActualProd(prod: ActualProd | undefined): prod is ActualProd {
  return prod !== undefined;
}

export async function renderProdCardsActual(containerName: string, allProds: Product[], allUsers: User[]) {
  const container = getElement(containerName);
  if (!container) return;

  const usersMap = new Map(allUsers.map((u) => [u.id, u]));

  const actualProd: ActualProd[] = allProds
    .filter((prod) => !prod.status && prod.date)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 4)
    .map((prod) => {
      const user = usersMap.get(prod.userId);
      if (!user) return;

      const totalScore =
        user.score.reduce((sum, sc) => sum + Number(sc), 0) / user.score.length;

      return {
        id: prod.id,
        img: prod.img,
        title: prod.title,
        goal: prod.goal,
        collected: prod.collected,
        userInfo: {
          id: user.id,
          name: `${user.name}.`,
          surname: user.surname,
          score: Math.round(totalScore),
        },
        date: prod.date,
      };
    })
    .filter(isActualProd);



  container.innerHTML = '';
  actualProd.forEach((prod) => {
    renderCard(prod, container);
  });
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day); // месяц от 0 до 11
}

export async function renderProdCardsAll(containerName: string, allProds: Product[], allUsers: User[]) {
  const container = getElement(containerName);
  const actualProd: ActualProd[] = [];

  allProds.forEach((prod) => {
    allUsers.forEach((user) => {
      if (prod.userId == user.id && !prod.status) {
        const totalScore =
          user.score.reduce((sum, sc) => sum + Number(sc), 0) / user.score.length;

        actualProd.push({
          id: prod.id,
          img: prod.img,
          title: prod.title,
          goal: prod.goal,
          collected: prod.collected,
          userInfo: {
            id: user.id,
            name: `${user.name || '-'}.`,
            surname: user.surname,
            score: Math.round(totalScore),
          },
          date: prod.date,
        });
      }
    });
  });

  if (!container) return;

  container.innerHTML = '';
  actualProd.forEach((prod) => {
    renderCard(prod, container);
  });
}

export async function renderProdUsersAll(containerName: string, allProds: Product[], allUsers: User[]) {
  const container = getElement(containerName);
  const actualProd: ActualProd[] = [];

  allProds.forEach((prod) => {
    allUsers.forEach((user) => {
      if (prod.userId == user.id) {
        const totalScore =
          user.score.reduce((sum, sc) => sum + Number(sc), 0) / user.score.length;

        console.log(totalScore);

        actualProd.push({
          id: prod.id,
          img: prod.img,
          title: prod.title,
          goal: prod.goal,
          collected: prod.collected,
          userInfo: {
            id: user.id,
            name: `${user.name || '-'}.`,
            surname: user.surname,
            score: Math.round(totalScore),
          },
          date: prod.date,
        });
      }
    });
  });

  if (!container) return;

  container.innerHTML = '';
  actualProd.forEach((prod) => {
    renderCard(prod, container);
  });
}

export function renderCard(prod: ActualProd, container: HTMLElement) {
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

  cardUser.appendChild(cardUserFIO);
  cardUser.appendChild(cardUserScore);

  cardInfo.append(cardTitle);
  cardInfo.append(cardGoal);
  cardInfo.append(cardCollected);
  cardInfo.append(progressBar);
  cardInfo.append(cardUser);

  const prodBtn = renderElement<HTMLAnchorElement>('a', ['prod__btn', 'btn', 'btn_orange']);
  prodBtn.innerText = 'Підтримати';
  prodBtn.href = `prod.html?id=${prod.id}`;

  card.append(cardImg);
  card.append(cardInfo);

  prodCard.appendChild(card);
  prodCard.appendChild(prodBtn);

  container.appendChild(prodCard);
}
