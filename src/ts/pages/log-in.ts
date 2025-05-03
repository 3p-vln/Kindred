import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { validateLogInForm } from '../log-in/login-validate.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  validateLogInForm();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
