import { Pay, Payments, Product, User } from '../../typings/interfaces.ts';
import { getElement, getElements, renderElement } from '../composables/use-call-dom.ts';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { done } from './done-pop-up.ts';
import { getAllProds, getAllUsers } from '../composables/requests.ts';
import { renderMyOrders } from './render-my-orders.ts';

const container = getElement('.payments__content');
const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');

export async function payment(payments: Payments[], allProducts: Product[], allUsers: User[]) {
  const allPays: Pay[] = [];

  payments.forEach((pay) => {
    allProducts.forEach((product) => {
      allUsers.forEach((user) => {
        if (pay.prodId === product.id && user.id === pay.userId && storedUserInfo.id === product.userId && pay.status === 'waiting') {
          allPays.push({
            id: pay.id,
            date: pay.date,
            img: pay.img,
            prod: {
              id: product.id,
              title: product.title,
              collected: product.collected,
            },
            prodUserId: pay.prodUserId,
            status: pay.status,
            sum: pay.sum,
            user: {
              id: user.id,
              name: user.name,
              surname: user.surname,
            },
          });
        }
      });
    });
  });

  const sortedPay = allPays.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  if (!container) return;
  container.innerHTML = '';

  sortedPay.forEach((pay) => {
    renderPay(pay);
  });

  noPay();
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

async function renderPay(pay: Pay) {
  if (!container) return;

  const payContent = renderElement('div', ['pay', `pay_${pay.id}`, `prod_${pay.prod.id}`]);

  const payImg = renderElement('div', 'pay__img');
  payImg.innerHTML = `
  <img src="${pay.img}" alt="${pay.date}"></img>
  `;

  const payInfo = renderElement('div', 'pay__info');

  const payName = renderElement('p', 'pay__name');
  payName.innerHTML = `<span>Збір: </span>${pay.prod.title}`;

  const paySum = renderElement('p', 'pay__sum');
  paySum.innerHTML = `<span>Сума платежу: </span>${pay.sum} грн.`;

  const payDate = renderElement('p', 'pay__date');
  payDate.innerHTML = `<span>Дата здійснення платежу: </span>${pay.date}`;

  const payUser = renderElement('p', 'pay__user');
  payUser.innerHTML = `<span>Від кого було здійснено платіж: </span>${pay.user.name} ${pay.user.surname}`;

  const payBtns = renderElement('div', 'pay__btns');
  const payAgreeBtn = renderElement('button', ['pay__btn', 'btn', 'btn_green', 'pay__agree']);
  payAgreeBtn.innerText = 'Підтвердити';

  payAgreeBtn.addEventListener('click', async () => {
    await veryfi(pay, payContent);
    done('підтверджено');
  });

  const payRemoveBtn = renderElement('button', ['pay__btn', 'btn', 'btn_red', 'pay__remove']);
  payRemoveBtn.innerText = 'Відхилити';

  payRemoveBtn.addEventListener('click', async () => {
    await remove(pay, payContent);
    done('відхилено');
  });

  payBtns.appendChild(payAgreeBtn);
  payBtns.appendChild(payRemoveBtn);

  payInfo.appendChild(payName);
  payInfo.appendChild(paySum);
  payInfo.appendChild(payDate);
  payInfo.appendChild(payUser);
  payInfo.appendChild(payBtns);

  payContent.appendChild(payImg);
  payContent.appendChild(payInfo);

  container.appendChild(payContent);
}

async function veryfi(pay: Pay, payContent: HTMLElement) {
  try {
    const payRef = doc(db, 'payments', pay.id);

    await updateDoc(payRef, {
      status: 'done',
    });

    const prodRef = doc(db, 'prods', pay.prod.id);

    await updateDoc(prodRef, {
      collected: Number(pay.prod.collected + Number(pay.sum)),
    });

    const userRef = doc(db, 'users', pay.user.id);

    await updateDoc(userRef, {
      supportedProds: arrayUnion(pay.prod.id),
    });

    payContent.remove();

    const allProd = await getAllProds();
    const allUsers = await getAllUsers();

    if (!allProd || !allUsers) return;

    await renderMyOrders(allProd, allUsers);
    noPay();
  } catch (error) {
    console.error(error);
  }
}

async function remove(pay: Pay, payContent: HTMLElement) {
  try {
    const payRef = doc(db, 'payments', pay.id);

    await updateDoc(payRef, {
      status: 'remove',
    });

    payContent.remove();
    noPay();
  } catch (error) {
    console.error(error);
  }
}

function noPay() {
  const paysCard = getElements('.pay');

  if (paysCard.length === 0 && container) {
    container.innerText = 'Донати відстні.';
  }
}
