import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { TopUser } from '../../typings/interfaces.ts';
import { db } from '../modules/firebace.ts';

export async function renderUsersCards(containerName: string) {
  const container = getElement(containerName);
  const topUsers: TopUser[] = [];

  if (!container) return;

  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));

    const allCoefs: number[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
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

      allCoefs.push(succsesfulCoef);

      const topUser: TopUser = {
        id: userDoc.id,
        img: userData.img,
        name: userData.name || '',
        surname: userData.surname || '',
        allCollections,
        succsesfulCollections,
        dateOfRegister: userData.dateOfRegister || '',
        score: Math.min(Math.ceil(succsesfulCoef * 5), 5),
      };

      topUsers.push(topUser);
    }

    topUsers.sort((a, b) => b.score - a.score);

    const topFiveUsers = topUsers.slice(0, 5);

    topFiveUsers.forEach((user) => {
      renderUserCards(user, container);
    });
  } catch (error) {
    console.error('Ошибка при получении пользователей или сборов:', error);
  }
}

function renderUserCards(user: TopUser, container: HTMLElement) {
  const userCard = renderElement<HTMLAnchorElement>('a', ['user', `user_${user.id}`]);

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
