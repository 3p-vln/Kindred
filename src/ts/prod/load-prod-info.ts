import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { Prod } from '../../typings/interfaces.ts';
import { getElement } from '../composables/use-call-dom.ts';
import { openPopUp } from './sup-popup.ts';

const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id') || undefined;

export async function loadProdInfo() {
  if (!prodId) return;

  const prodAll: Prod[] = [];

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

        prodAll.push({
          id: docSnap.id,
          img: data.img,
          title: data.title,
          goal: data.goal,
          collected: data.collected,
          userInfo: userInfo,
          discription: data.discription,
          link: data.link,
        });
      }
    }

    const currProd = prodAll.find((item) => item.id === prodId);
    if (!currProd) throw new Error();

    loadInfo(currProd);
    openPopUp(currProd.link, currProd.collected);
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
  }
}

function loadInfo(prod: Prod) {
  const prodImg = getElement('.prod-info__img');
  const prodTitle = getElement('.info__title');
  const prodOwner = getElement('.info__owner');
  const prodDesc = getElement('.info__about');
  const prodGoal = getElement('.info__goal span');
  const prodCollected = getElement('.info__collected span');
  const prodActiveProgress = getElement('.progress-bar__progress');

  if (!prodImg || !prodTitle || !prodOwner || !prodDesc || !prodGoal || !prodCollected || !prodActiveProgress) return;

  prodImg.innerHTML = `
    <img src="${prod.img}" alt="${prod.title}"></img>
  `;

  prodTitle.innerText = prod.title;

  prodOwner.innerHTML = `
  <div>
    <span>Збір від </span>
    ${prod.userInfo.name} ${prod.userInfo.surname}
  </div>
   
  <div class="score">
    ${prod.userInfo.score} 
    <svg>
      <use href="#star"></use>
    </svg>
  </div>
  `;

  prodDesc.innerText = prod.discription;
  prodGoal.innerText = prod.goal + 'грн.';
  prodCollected.innerText = prod.collected + 'грн.';
  prodActiveProgress.style.width = (prod.collected * 100) / prod.goal + '%';
}
