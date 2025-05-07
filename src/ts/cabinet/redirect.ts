import Cookies from 'js-cookie';

export function redirect(){
  const user = JSON.parse(JSON.stringify(localStorage.getItem('user'))) || false;
  const token = Cookies.get('UID');

  if(!token || !user) {
    window.location.href = '/Kindred/index.html';
  }
}