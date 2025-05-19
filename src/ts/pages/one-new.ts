import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { getCurrentNew, getCurrentUsers } from '../composables/requests.ts';
import { renderInfoNew } from '../one-new/render-info.ts';

const urlParams = new URLSearchParams(window.location.search);
const newId = urlParams.get('id') || undefined;
// const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

document.addEventListener('DOMContentLoaded', async () => {
  if (!newId) return;
  const newInfo = await getCurrentNew(newId);

  if(!newInfo) return;
  const userProdInfo = await getCurrentUsers(newInfo.userId)

  if(!userProdInfo) return;

  renderInfoNew(newInfo, userProdInfo);
  burgerMenu();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
