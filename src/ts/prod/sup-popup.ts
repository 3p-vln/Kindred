import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { addDoc, collection} from 'firebase/firestore';
import { db, storage } from '../modules/firebace.ts';
import Cookies from 'js-cookie';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const btn = getElement('.info__btn');
const popUp = getElement('.popup');
const popUpLink = getElement<HTMLAnchorElement>('.popup__link');
const popUpClose = getElement('.popup__close');
const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id') || undefined;
const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const token = Cookies.get('UID');

export function openPopUp(prodLink: string, prodUserId: string) {
  if(storedUserInfo && token) {
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
    validate(prodUserId);
    return
  }

  btn?.addEventListener('click', () => {
    window.location.href = '/Kindred/log-in.html';
  });
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

function validate( prodUserId: string) {
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
        errorMessage: 'Будь ласка, додайте зображення',
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
    const imgInp = getElement<HTMLInputElement>('#file');

    if (sumInp && imgInp) {
      await createPay(sumInp, imgInp, prodUserId);
    }

    popUp?.classList.remove('popup_active');
  });
}

async function createPay(sumInput: HTMLInputElement, imgInput: HTMLInputElement, prodUserId: string) {
  const img = imgInput?.files?.[0];

  if (!img) return;

  const url = await uploadImage(img);

  await addDoc(collection(db, 'payments'), {
    sum: sumInput.value,
    img: url,
    date: new Date().toLocaleDateString('ru-RU'),
    userId: storedUserInfo.id,
    prodId: prodId,
    prodUserId: prodUserId,
    status: 'waiting',
  })
}

async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error('Нет файла');

  const storageRef = ref(storage, `payments/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}
