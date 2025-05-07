import { burgerMenu } from '../components/header';
import { setRange } from '../catalogue/custom-range.ts';
import { renderProdCardsAll } from '../components/render-prod-cards.ts';
import { preloader, stopPreload } from '../components/preloader.ts';
import { getAllProds, getAllUsers } from '../composables/requests.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const allProds = await getAllProds();
  const allUsers = await getAllUsers();
  if(!allProds || !allUsers) return;

  burgerMenu();
  setRange();
  await renderProdCardsAll('.prod-list__content', allProds, allUsers);
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
