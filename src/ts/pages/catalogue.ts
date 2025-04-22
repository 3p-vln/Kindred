import { burgerMenu } from '../components/header';
import { setRange } from '../catalogue/custom-range.ts';
import { renderProdCardsAll } from '../components/render-prod-cards.ts';

document.addEventListener('DOMContentLoaded', async () => {
    burgerMenu();
    setRange();
    await renderProdCardsAll('.prod-list__content');
});
