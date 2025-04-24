import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';

const btn = getElement('.info__btn');
const popUp = getElement('.popup');
const popUpLink = getElement<HTMLAnchorElement>('.popup__link');
const popUpClose = getElement('.popup__close');
const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id') || undefined;

export function openPopUp(prodLink: string, curentSum: number) {
  btn?.addEventListener('click', () => {
    popUp?.classList.add('popup_active');
    scrolLock();
    if (popUpLink) {
      popUpLink.href = prodLink;
      popUpLink.innerText = prodLink;
    }
  });

  closePopUp();
  scrolLock();
  validate(curentSum);
}

function closePopUp() {
  popUpClose?.addEventListener('click', () => {
    if (popUp?.classList.contains('popup_active')) {
      popUp?.classList.remove('popup_active');
    }

    scrolLock();
  });
}

function scrolLock() {
  const body = getElement('body');

  if (!body) return;

  if (popUp?.classList.contains('popup_active')) {
    body.style.overflow = 'hidden';

    return;
  }

  body.style.overflow = 'auto';
}

function validate(curentSum: number) {
  const form = getElement<HTMLFormElement>('#sup-popup');
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
    .addField('#file', [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Будь ласка, додайте файл',
      },
    ])
    .addField('#summ', [
      {
        rule: 'required',
        errorMessage: "Це обов'язкове поле для заповнення",
      },
    ]);

  validator.onSuccess(async () => {
    const sumInp = getElement<HTMLInputElement>('#summ');

    if (sumInp) {
      await updateSum(Number(sumInp.value), curentSum);
    }

    window.location.reload();
  });
}

async function updateSum(sumVal: number, curentSum: number) {
  if (!prodId) return;
  const docRef = doc(db, 'prods', prodId);

  await updateDoc(docRef, {
    collected: Number(curentSum + sumVal),
  });
}
