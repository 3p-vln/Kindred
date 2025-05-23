import Cookies from 'js-cookie';
import { getElement } from '../composables/use-call-dom.ts';

export function authPopUp() {
  const popup = getElement('#authPopup');
  const openButton = getElement('.header__account');
  const user = JSON.parse(JSON.stringify(localStorage.getItem('user'))) || false;
  const token = Cookies.get('UID');
  if (!(popup instanceof HTMLDialogElement)) return;
  const closeButton = getElement('.auth-pop-up__close', popup);
  const container = getElement('.auth-pop-up__container', popup);

  if (openButton) {
    openButton.addEventListener('click', () => {
      if (user && token) {
        window.location.href = `/Kindred/${cabinetLink()}`;
        return;
      }

      popup.show();
    });
  }

  (window as any).showPopup = function (): void {
    popup.show();
  };

  if (!(closeButton instanceof HTMLButtonElement)) return;
  closeButton.addEventListener('click', () => {
    popup.close();
  });

  popup.addEventListener('click', (e: MouseEvent) => {
    if (!(container instanceof HTMLDivElement)) return;
    const target: EventTarget | null = e.target;

    if (target instanceof Node && !container.contains(target)) {
      popup.close();
    }
  });
}

function cabinetLink(): string {
  const token = Cookies.get('Role');

  switch (token) {
    case 'admin':
      return 'cabinet-admin.html';
    case 'volunteer':
      return 'cabinet-volunteer.html';
    default:
      return 'cabinet-user.html';
  }
}