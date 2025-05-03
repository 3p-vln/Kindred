import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { validateRegForm } from '../registration/reg-validate.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  validateRegForm();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
