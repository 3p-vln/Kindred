import { getElement, renderElement } from '../composables/use-call-dom.ts';

export function done(change: string) {
  const popUp = renderElement('div', 'done-pop-up');
  switch (change) {
    case 'збір':
      popUp.innerText = 'Збір успішно створено';
      break;
    case 'новина':
      popUp.innerText = 'Новину успішно створено';
      break;
    case 'закрито':
      popUp.innerText = 'Збір закрито';
      break;
    case 'підтверджено':
      popUp.innerText = 'Платіж підтверджено';
      break;
    case 'відхилено':
      popUp.innerText = 'Платіж відхилено';
      break;
    case 'змінено':
      popUp.innerText = 'Роль змінено';
      break;
    default:
      popUp.innerText = 'Дані змінено';
  }

  getElement('.wrapper')?.appendChild(popUp);
  setTimeout(() => {
    popUp.style.opacity = '0';
  }, 5000);
  setTimeout(() => {
    getElement('.wrapper')?.removeChild(popUp);
  }, 6000);
}
