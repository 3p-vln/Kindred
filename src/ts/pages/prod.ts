import { burgerMenu } from '../components/header';
import { loadProdInfo } from '../prod/load-prod-info.ts';
import { preloader, stopPreload } from '../components/preloader.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  await loadProdInfo();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
