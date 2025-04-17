import { burgerMenu } from '../components/header';
import { renderProdCards } from '../components/render-prod-cards.ts';
import {renderUsersCards} from "../main/top-users-render.ts";

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  await renderProdCards('.actual__list');
  await renderUsersCards('.volunteer-list');
});
