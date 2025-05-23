import { burgerMenu } from '../components/header';
import { loadProdInfo } from '../prod/load-prod-info.ts';
import { preloader, stopPreload } from '../components/preloader.ts';
import { changeInfo } from '../prod/change-info.ts';
import { getCurrentProd, getCurrentUsers } from '../composables/requests.ts';

const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id') || undefined;

document.addEventListener('DOMContentLoaded', async () => {
  if (!prodId) return;
  const prodInfo = await getCurrentProd(prodId);

  if(!prodInfo) return;
  const userProdInfo = await getCurrentUsers(prodInfo.userId)

  if(!userProdInfo) return;

  burgerMenu();
  await loadProdInfo(prodInfo, userProdInfo);
  await changeInfo(prodInfo);
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
