import { New, User } from '../../typings/interfaces.ts';
import { getElement } from '../composables/use-call-dom.ts';

const nameContainer = getElement<HTMLAnchorElement>('.one-new__name');
const scoreContainer = getElement('.one-new__score');
const dateContainer = getElement('.one-new__date');
const titleContainer = getElement('.one-new__title');
const textContainer = getElement('.one-new__text');
const imgContainer = getElement<HTMLImageElement>('.one-new__img img');

export function renderInfoNew(newInfo: New, user: User) {
  if (!nameContainer || !scoreContainer || !dateContainer || !titleContainer || !textContainer || !imgContainer) return;

  nameContainer.innerText = `${user.surname} ${user.name ? user.name.charAt(0).toUpperCase() + '.' : ''}`;
  nameContainer.href = `user.html?id=${user.id}`
  scoreContainer.innerHTML = `
    ${user.score.reduce((sum, sc) => sum + Number(sc), 0) / user.score.length}
    <svg>
      <use href="#star"></use>
    </svg>
    `;
  dateContainer.innerText = newInfo.date;
  titleContainer.innerText = newInfo.title;
  textContainer.innerText = newInfo.info;
  imgContainer.src = newInfo.img;
}
