import { burgerMenu } from '../components/header';
import { renderProdCardsActual } from '../components/render-prod-cards.ts';
import {renderUsersCards} from "../main/top-users-render.ts";

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  await renderProdCardsActual('.actual__list');
  await renderUsersCards('.volunteer-list');
});
