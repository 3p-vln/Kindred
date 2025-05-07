import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { Product } from '../../typings/interfaces.ts';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../modules/firebace.ts';
import JustValidate from 'just-validate';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const changeBtnContainer = getElement('.info__title');
const prodInfo = getElement('.prod-info');
const page = getElement('.page');
const urlParams = new URLSearchParams(window.location.search);
const prodId = urlParams.get('id');

export async function changeInfo(currentProdInfo: Product) {
  if (!prodInfo || !changeBtnContainer) return;

  const changeBtn = getElement('span', changeBtnContainer);
  if (!changeBtn) return;

  changeBtn.addEventListener('click', async () => {
    prodInfo.style.display = 'none';
    changeInfoForm(currentProdInfo);
  });
}

function changeInfoForm(prod: Product) {
  if (!page) return;

  const changeInfo = renderElement('div', 'change-info');
  changeInfo.innerHTML = `
    <div class="container">
      <div class="change-info__content">
        <form id="change-info">
          <div class="change-info__form form">
            <div class="form__item">
              <label class="form__label" for="title">Назва збору</label>
              <input class="form__input" type="text" id="title">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="goal">Мета (грн)</label>
              <input class="form__input" type="number" id="goal">
            </div>
            
            <div class="form__item">
              <label class="form__label" for="collected">Зібрано (грн)</label>
              <input class="form__input" type="number" id="collected" name="collected">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="discription">Розгорнута інформація про збір</label>
              <textarea class="form__textarea" id="discription"></textarea>
            </div>
      
            <div class="form__item">
              <label class="form__label" for="img">Зображення для збору</label>
              <input class="form__input" type="file" id="img" accept="image/*">
            </div>
      
            <button class="form__btn btn btn_orange" type="submit">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  `;

  page.appendChild(changeInfo);

  const nameInput = getElement<HTMLInputElement>('#title');
  const goalInput = getElement<HTMLInputElement>('#goal');
  const collectedInput = getElement<HTMLInputElement>('#collected');
  const aboutInput = getElement<HTMLTextAreaElement>('#discription');
  const imgInput = getElement<HTMLInputElement>('#img');

  if (!nameInput || !goalInput || !collectedInput || !aboutInput || !imgInput) return;

  nameInput.value = prod.title;
  goalInput.value = prod.goal.toString();
  collectedInput.value = prod.collected.toString();
  aboutInput.value = prod.discription;

  setTimeout(() => {
    validate(prod, nameInput, goalInput, collectedInput, aboutInput, imgInput);
  }, 100);
}

function validate(prod: Product, nameInput: HTMLInputElement, goalInput: HTMLInputElement, collectedInput: HTMLInputElement, aboutInput: HTMLTextAreaElement, imgInput: HTMLInputElement) {
  const form = getElement<HTMLFormElement>('#change-info');
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
    .addField('#collected', [
      {
        rule: 'required',
        errorMessage: 'Це поле обовʼязкове',
      },
      {
        validator: () => {
          const input = getElement<HTMLInputElement>('#collected');
          if (!input) return false;

          const raw = input.value.trim().replace(',', '.');
          const value = parseFloat(raw);

          if (isNaN(value)) return false;

          return value >= prod.collected;
        },
        errorMessage: `Значення має бути більше або рівна ${prod.collected}`,
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
    ]);

  validator.onSuccess(async () => {
    await updateProd(nameInput, goalInput, collectedInput, aboutInput, imgInput);
    window.location.href = `/Kindred/prod.html?id=${prodId}`;
  });
}

async function updateProd(nameInput: HTMLInputElement, goalInput: HTMLInputElement, collectedInput: HTMLInputElement, aboutInput: HTMLTextAreaElement, imgInput: HTMLInputElement) {
  const name = nameInput.value;
  const goal = goalInput.value;
  const collected = collectedInput.value;
  const about = aboutInput.value;
  const file = imgInput?.files?.[0];

  try {
    if (!prodId) return;

    const url = await uploadImage(file);
    const docRef = doc(db, 'prods', prodId);

    await updateDoc(docRef, {
      img: url,
      title: name,
      goal: goal,
      discription: about,
      collected: collected,
    });
  } catch (error) {
    console.error(error);
  }
}

async function uploadImage(file: File | null = null): Promise<string> {
  if (!file) {
    if (!prodId) throw new Error('Нет файла');
    const userData = await getDoc(doc(db, 'prods', prodId));
    if (!userData || !userData.data()?.img) throw new Error('Нет файла');

    return userData.data()?.img;
  }
  const storageRef = ref(storage, `prods/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}
