import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { ActualProd } from '../../typings/interfaces.ts';
import { db } from '../modules/firebace.ts';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

export async function renderMyOrders() {
  const container = getElement('.my-orders__content');
  const actualProd: ActualProd[] = [];

  const docRef = await getDoc(doc(db, 'users', storedUserInfo.id));
  const userProd: string[] = docRef.data()?.supportedProds;

  if (!container) return;

  for (let i = 0; i < userProd.length; i++) {
    const docSnap = await getDoc(doc(db, 'prods', userProd[i]));
    const data = docSnap.data();

    if (!data?.status) {
      let userInfo = {
        name: 'Unknown',
        surname: '',
        score: 0,
      };

      if (data?.userId) {
        const userRef = doc(db, 'users', data.userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          const myProds: string[] = userData.myProds || [];
          let succsesfulCollections = 0;

          for (const prodId of myProds) {
            const prodRef = doc(db, 'prods', prodId);
            const prodSnap = await getDoc(prodRef);

            if (prodSnap.exists()) {
              const prodData = prodSnap.data();
              if (prodData.status === true) {
                succsesfulCollections++;
              }
            }
          }

          const allCollections = myProds.length;
          const succsesfulCoef = allCollections > 0 ? succsesfulCollections / allCollections : 0;
          const score = Math.min(Math.ceil(succsesfulCoef * 5), 5);

          userInfo = {
            name: userData.name || '—',
            surname: userData.surname || '',
            score: score,
          };
        }
      }

      actualProd.push({
        id: docSnap.id,
        img: data?.img,
        title: data?.title,
        goal: data?.goal,
        collected: data?.collected,
        userInfo: userInfo,
      });
    }
  }

  container.innerHTML = '';
  actualProd.forEach((prod) => {
    renderCard(prod, container);
  });
}

export async function renderProdCardsAll(containerName: string) {
  const container = getElement(containerName);
  const actualProd: ActualProd[] = [];

  if (!container) return;

  try {
    const prodSnapshot = await getDocs(collection(db, 'prods'));

    for (const docSnap of prodSnapshot.docs) {
      const data = docSnap.data();

      if (!data.status) {
        let userInfo = {
          name: 'Unknown',
          surname: '',
          score: 0,
        };

        if (data.userId) {
          const userRef = doc(db, 'users', data.userId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            const myProds: string[] = userData.myProds || [];
            let succsesfulCollections = 0;

            for (const prodId of myProds) {
              const prodRef = doc(db, 'prods', prodId);
              const prodSnap = await getDoc(prodRef);

              if (prodSnap.exists()) {
                const prodData = prodSnap.data();
                if (prodData.status === true) {
                  succsesfulCollections++;
                }
              }
            }

            const allCollections = myProds.length;
            const succsesfulCoef = allCollections > 0 ? succsesfulCollections / allCollections : 0;
            const score = Math.min(Math.ceil(succsesfulCoef * 5), 5);

            userInfo = {
              name: userData.name || '—',
              surname: userData.surname || '',
              score: score,
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
      }
    }

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
