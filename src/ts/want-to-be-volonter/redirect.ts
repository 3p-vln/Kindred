import Cookies from 'js-cookie';
import { validateForm } from './validate-form.ts';
import { setValue } from './set-value.ts';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const token = Cookies.get('UID');
// const role = Cookies.get('Role');

export function redirect() {
  if(!storedUserInfo || !token) {
    window.location.href = '/Kindred/log-in.html';
    return;
  }

  // if(role === 'customer'){
    setValue();
    validateForm();
    // return;
  // }

  // window.location.href = `/Kindred/cabinet-${role}.html`;
}