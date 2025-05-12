import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { getAllProds, getAllUsers } from '../composables/requests.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const allProds = await getAllProds();
  const allUsers = await getAllUsers();
  if(!allProds || !allUsers) return;

  burgerMenu();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
