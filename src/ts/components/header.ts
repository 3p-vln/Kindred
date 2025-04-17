import { getElement } from '../composables/use-call-dom.ts';

const burgerBtn = getElement('.burger__btn');
const menu = getElement('.menu');

export function burgerMenu() {
  burgerToggle();
  resize();
}

function burgerToggle() {
  if (!burgerBtn || !menu) return;

  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    burgerBtn.classList.toggle('burger__btn_active');
    menu.classList.toggle('menu_active');
    scrolLock();
  });
}

function resize() {
  if (!burgerBtn || !menu) return;

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (burgerBtn.classList.contains('burger__btn_active')) {
        burgerBtn.classList.remove('burger__btn_active');
      }

      if (menu.classList.contains('menu_active')) {
        menu.classList.remove('menu_active');
      }
    }
  });
}

function scrolLock() {
  if (!burgerBtn) return;

  const body = getElement('body');

  if (!body) return;

  if (burgerBtn.classList.contains('burger__btn_active')) {
    body.style.overflow = 'hidden';

    return;
  }

  body.style.overflow = 'auto';
}
