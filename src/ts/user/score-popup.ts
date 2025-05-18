import { getElement, getElements } from '../composables/use-call-dom.ts';
import Cookies from 'js-cookie';
import { User } from '../../typings/interfaces.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { getCurrentUsers } from '../composables/requests.ts';

const btn = getElement('.avatar__btn');
const popUp = getElement('.popup');
const popUpName = getElement('.popup__title span');
const popUpClose = getElement('.popup__close');
const popUpStars = getElements('.popup__star');
const sendBtn = getElement('.popup__btn');
const token = Cookies.get('UID');
const reit = getElement('.avatar__reit span');

export function openPopUp(user: User) {
  if (token) {
    btn?.addEventListener('click', () => {
      popUp?.classList.add('popup_active');
      scrolLock();
      if (popUpName) {
        popUpName.innerText = user.name + ' ' + user.surname;
      }

      for (let i = 0; i < popUpStars.length; i++) {
        popUpStars[i].innerHTML = `
          <svg>
              <use href="#star-black"></use>
          </svg>
        `;
      }
    });

    closePopUp();
    scrolLock();
    clickStar(user);
    return;
  }

  btn?.addEventListener('click', () => {
    window.location.href = '/Kindred/log-in.html';
  });
}

function closePopUp() {
  popUpClose?.addEventListener('click', () => {
    if (popUp?.classList.contains('popup_active')) {
      popUp?.classList.remove('popup_active');
    }

    scrolLock();
  });
}

function scrolLock() {
  const body = getElement('body');

  if (!body) return;

  if (popUp?.classList.contains('popup_active')) {
    body.style.overflow = 'hidden';

    return;
  }

  body.style.overflow = 'auto';
}

function clickStar(user: User) {
  if (!popUpStars) return;

  popUpStars.forEach((star) => {
    star.addEventListener('click', async () => {
      const score = Number(star.id);

      for (let i = 0; i < popUpStars.length; i++) {
        popUpStars[i].innerHTML = `
          <svg>
              <use href="${i < score ? '#star' : '#star-black'}"></use>
          </svg>
        `;
      }

      const allUsers = await getCurrentUsers(user.id);
      if (!allUsers) return;

      loadScoreToDb(score, allUsers);
    });
  });
}

function loadScoreToDb(score: number, user: User) {
  sendBtn?.addEventListener('click', async () => {
    try {
      const userRef = doc(db, 'users', user.id);
      const scoreAll = user.score || [];
      const newScore = [...scoreAll, score];

      await updateDoc(userRef, {
        score: newScore,
      });

      popUp?.classList.remove('popup_active');

      if (!reit) return;

      let userScore = 0;

      newScore.forEach((sc) => {
        userScore += Number(sc);
      });

      const totalScore = userScore / newScore.length;

      reit.innerText = Math.round(totalScore).toString();
    } catch (error) {
      console.error(error);
    }
  });
}
