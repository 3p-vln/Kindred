import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { ActualProd } from '../../typings/interfaces.ts';
import { db } from '../modules/firebace.ts';

export async function renderProdCards(containerName: string) {
  const container = getElement(containerName);
  const actualProd: ActualProd[] = [];

  if (!container) return;

  try {
    const prodSnapshot = await getDocs(collection(db, 'prods'));
    let count = 0;

    for (const docSnap of prodSnapshot.docs) {
      const data = docSnap.data();

      if (!data.status && count < 4) {
        let userInfo = {
          name: 'Неизвестно',
          surname: '',
          score: 0,
        };

        // Получаем документ пользователя по ID
        if (data.userId) {
          const userRef = doc(db, 'users', data.userId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            userInfo = {
              name: userData.name || '—',
              surname: userData.surname || '',
              score: userData.score || 0,
            };
          }
        }

        actualProd.push({
          id: docSnap.id,
          img: data.img,
          title: data.title,
          goal: data.goal,
          collected: data.collected,
          userInfo: userInfo,
        });

        count += 1;
      }
    }

    console.log(actualProd);

    container.innerHTML = '';
    actualProd.forEach((prod) => {
      renderCard(prod, container);
    });
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
  }
}

function renderCard(prod: ActualProd, container: HTMLElement) {
  const prodCard = renderElement('div', ['prod', `prod_${prod.id}`]);

  const card = renderElement<HTMLAnchorElement>('a', ['prod__card', 'card', `card_${prod.id}`]);

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

  const prodBtn = renderElement<HTMLAnchorElement>('a', ['prod__btn', 'btn', 'btn_orange']);
  prodBtn.innerText = 'Підтримати';

  card.append(cardImg);
  card.append(cardTitle);
  card.append(cardGoal);
  card.append(cardCollected);
  card.append(progressBar);
  card.append(cardUser);

  prodCard.appendChild(card);
  prodCard.appendChild(prodBtn);

  container.appendChild(prodCard);
}
