import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { createOrder } from './create-order.ts';
import { done } from './done-pop-up.ts';
import { renderAllOrders } from './render-all-orders.ts';
import { getAllPayments, getAllProds, getAllUsers } from '../composables/requests.ts';

export function validateCreateOrderForm() {
  const form = getElement<HTMLFormElement>('#create-order-form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorLabelStyle: {
      color: '#ff7d4e',
    },
    focusInvalidField: true,
    lockForm: false,
    validateBeforeSubmitting: true,
  });

  validator
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: `Введіть назву збору`,
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: `Довжина назви повинна бути більше 1 літери`,
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: `Довжина назви повинна бути менше`,
      },
    ])
    .addField('#goal', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле`,
      },
    ])
    .addField('#link', [
      {
        rule: 'required',
        errorMessage: 'Це поле обовʼязкове',
      },
      {
        rule: 'customRegexp',
        value: /^https:\/\/send\.monobank\.ua\/\w+/,
        errorMessage: 'Введіть коректне посилання на банку Monobank',
      },
    ])
    .addField('#discription', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле для заповнення`,
      },
      {
        rule: 'minLength',
        value: 20,
        errorMessage: 'Напишіть трохи більше інформації',
      },
    ])
    .addField('#img', [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Будь ласка, додайте файл',
      },
    ]);

  validator.onSuccess(async () => {
    await createOrder();

    const allProd = await getAllProds();
    const allUsers = await getAllUsers();
    const payments = await getAllPayments();

    if(!allProd || !allUsers || !payments) return;
    await renderAllOrders(allProd, allUsers, payments);

    done('збір');
  });
}
