import { getElement } from '../composables/use-call-dom.ts';
import { getAuth, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';

const logOutBtn = getElement('.tabs__nav-btn_log-out');

export async function logOut() {
  logOutBtn?.addEventListener('click', async () => {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        Cookies.remove('UID', { path: '/' });
        Cookies.remove('Role', { path: '/' });
        localStorage.removeItem('user');
        window.location.href = '/Kindred/index.html';
      });
    } catch (error) {
      console.error(error);
    }
  });
}
