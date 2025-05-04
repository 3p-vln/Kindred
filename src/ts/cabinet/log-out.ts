import { getElement } from '../composables/use-call-dom.ts';
import { getAuth, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';

const logOutBtn = getElement('.tabs__nav-btn_log-out');

export async function logOut() {
  logOutBtn?.addEventListener('click', async () => {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.href = '/Kindred/index.html';
        console.log('Пользователь вышел из системы');
        Cookies.remove('UID', { path: '/' });
        Cookies.remove('Role', { path: '/' });
        localStorage.removeItem('user');
        console.log(document.cookie)
      });
    } catch (error) {
      console.error(error);
    }
  });
}
