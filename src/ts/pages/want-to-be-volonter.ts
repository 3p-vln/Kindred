import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { redirect } from '../want-to-be-volonter/redirect.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  redirect();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
