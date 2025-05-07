import { burgerMenu } from '../components/header';
import { renderProdCardsActual } from '../components/render-prod-cards.ts';
import {renderUsersCards} from "../main/top-users-render.ts";
import { preloader, stopPreload } from '../components/preloader.ts';
import { getAllProds, getAllUsers } from '../composables/requests.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const actualProds = await getAllProds();
  const allUsers = await getAllUsers();

  if(!actualProds || !allUsers) return;

  burgerMenu();
  await renderProdCardsActual('.actual__list', actualProds, allUsers);
  await renderUsersCards('.volunteer-list', allUsers, actualProds);
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
