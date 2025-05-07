import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { initDropdownMenu } from '../cabinet/dropdown.ts';
import { initTab } from '../cabinet/tab.ts';
import { validateAccInfoForm } from '../cabinet/acc-info-validate.ts';
import { autoFillInp } from '../cabinet/acc-info.ts';
import { logOut } from '../cabinet/log-out.ts';
import { renderMyOrders } from '../cabinet/render-my-orders.ts';
import { redirect } from '../cabinet/redirect.ts';
import { getAllProds, getAllUsers } from '../composables/requests.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const allProd = await getAllProds();
  const allUsers = await getAllUsers();

  if(!allProd || !allUsers) return;

  burgerMenu();
  redirect();
  initTab();
  initDropdownMenu();
  autoFillInp();
  validateAccInfoForm();
  await logOut();
  await renderMyOrders(allProd, allUsers);
  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
