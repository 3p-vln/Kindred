import { Product, User } from '../../typings/interfaces.ts';
import { getElement } from '../composables/use-call-dom.ts';
import { openPopUp } from './sup-popup.ts';
import Cookies from 'js-cookie';

const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id') || undefined;
const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const role = Cookies.get('Role');
const token = Cookies.get('UID');

export async function loadProdInfo(prodInfo: Product, userProdInfo: User) {
  if (!prodId) return;
  loadInfo(prodInfo, userProdInfo);
  openPopUp(prodInfo.link, userProdInfo.id);
}

function loadInfo(prod: Product, userProdInfo: User) {
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

  if (token && (storedUserInfo.id === userProdInfo.id || role === 'admin')) {
    prodTitle.innerHTML = `
    ${prod.title} 
    <span>
      <svg>
        <use href="#pencil"></use>
      </svg>
    </span>
  `;
  } else prodTitle.innerText = prod.title;

  prodOwner.innerHTML = `
  <div>
    <span>Збір від </span>
    ${userProdInfo.name} ${userProdInfo.surname}
  </div>
   
  <div class="score">
    ${userProdInfo.score} 
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
