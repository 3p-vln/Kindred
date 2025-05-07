import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { initDropdownMenu } from '../cabinet/dropdown.ts';
import { initTab } from '../cabinet/tab.ts';
import { validateAccInfoForm } from '../cabinet/acc-info-validate.ts';
import { autoFillInp } from '../cabinet/acc-info.ts';
import { logOut } from '../cabinet/log-out.ts';
import { renderMyOrders } from '../cabinet/render-my-orders.ts';
import { redirect } from '../cabinet/redirect.ts';
import { validateCreateOrderForm } from '../cabinet/create-order-validate.ts';
import { validateCreateNewForm } from '../cabinet/create-new-validate.ts';
import { renderAllOrders } from '../cabinet/render-all-orders.ts';
import { getAllPayments, getAllProds, getAllUsers } from '../composables/requests.ts';
import { payment } from '../cabinet/payments.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const allProd = await getAllProds();
  const allUsers = await getAllUsers();
  const payments = await getAllPayments();

  if(!allProd || !allUsers || !payments) return;

  await renderMyOrders(allProd, allUsers);
  await renderAllOrders(allProd, allUsers, payments);
  await logOut();
  await payment(payments, allProd, allUsers);
  burgerMenu();
  redirect();
  initTab();
  initDropdownMenu();
  autoFillInp();
  validateAccInfoForm();
  validateCreateOrderForm();
  validateCreateNewForm();

  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
