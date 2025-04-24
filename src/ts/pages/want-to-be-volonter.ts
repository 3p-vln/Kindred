import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { validateForm } from '../want-to-be-volonter/validate-form.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  validateForm();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
