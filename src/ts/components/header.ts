import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { authPopUp } from './auth-pop-up.ts';
import Cookies from 'js-cookie';

const burgerBtn = getElement('.burger__btn');
const menu = getElement('.menu');
const menuList = getElement('.menu__list');
const token = Cookies.get('UID');

export function burgerMenu() {
  burgerToggle();
  resize();
  authPopUp();
}

function burgerToggle() {
  if (!burgerBtn || !menu) return;

  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    burgerBtn.classList.toggle('burger__btn_active');
    menu.classList.toggle('menu_active');
    scrolLock();

    if (menu.classList.contains('menu_active')) {
      authLi();
    } else {
      getElement('.menu__item_log-in')?.remove();
      getElement('.menu__item_reg')?.remove();
      getElement('.menu__item_cabinet')?.remove();
    }
  });
}

function resize() {
  if (!burgerBtn || !menu) return;

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      getElement('.menu__item_log-in')?.remove();
      getElement('.menu__item_reg')?.remove();
      getElement('.menu__item_cabinet')?.remove();

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

function authLi() {
  if (window.innerWidth < 768 && menuList) {
    if (!token) {
      const authItemFirst = renderElement('li', ['menu__item', 'menu__item_log-in']);
      authItemFirst.innerHTML = '<a href="log-in.html">Вхід</a>';

      const authItemSecond = renderElement('li', ['menu__item', 'menu__item_reg']);
      authItemSecond.innerHTML = '<a href="registration.html">Реєстрація</a>';

      menuList.appendChild(authItemFirst);
      menuList.appendChild(authItemSecond);
    } else {
      const authItemFirst = renderElement('li', ['menu__item', 'menu__item_cabinet']);
      authItemFirst.innerHTML = `<a href="${cabinetLink()}">Кабінет</a>`;

      menuList.appendChild(authItemFirst);
    }
  }
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
