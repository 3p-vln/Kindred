import { getElement, renderElement } from '../composables/use-call-dom.ts';

export function done() {
  const popUp = renderElement('div', 'done-pop-up');
  popUp.innerText = 'Заявку відправлено';

  getElement('.wrapper')?.appendChild(popUp);
  setTimeout(() => {
    popUp.style.opacity = '0';
  }, 5000);
  setTimeout(() => {
    getElement('.wrapper')?.removeChild(popUp);
  }, 6000);
}
