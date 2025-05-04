import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { initDropdownMenu } from '../cabinet/dropdown.ts';
import { initTab } from '../cabinet/tab.ts';
import { validateAccInfoForm } from '../cabinet/acc-info-validate.ts';
import { autoFillInp } from '../cabinet/acc-info.ts';
import { logOut } from '../cabinet/log-out.ts';
import { renderMyOrders } from '../cabinet/render-my-orders.ts';

document.addEventListener('DOMContentLoaded', async () => {
  burgerMenu();
  initTab();
  initDropdownMenu();
  autoFillInp();
  validateAccInfoForm();
  await logOut();
  await renderMyOrders();
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
