import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { New } from '../../typings/interfaces.ts';
import { arrayRemove, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../modules/firebace.ts';
import JustValidate from 'just-validate';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Cookies from 'js-cookie';

const changeBtnContainer = getElement('.one-new__operation');
const prodInfo = getElement('.one-new');
const page = getElement('.page');
const urlParams = new URLSearchParams(window.location.search);
const newId = urlParams.get('id');
const role = Cookies.get('Role');

export async function changeNewInfo(currentNewInfo: New, currentUserId: string) {
  if (!prodInfo || !changeBtnContainer) return;

  if (role === 'admin' || currentUserId === currentNewInfo.userId) {
    const changeBtn = getElement('.one-new__edit', changeBtnContainer);
    if (!changeBtn) return;

    changeBtn.addEventListener('click', async () => {
      prodInfo.style.display = 'none';
      changeInfoForm(currentNewInfo);
    });
  } else {
    changeBtnContainer.remove();
  }
}

function changeInfoForm(newInfo: New) {
  if (!page) return;

  const changeInfo = renderElement('div', 'change-info');
  changeInfo.innerHTML = `
    <div class="container">
      <div class="change-info__content">
        <form id="change-info">
          <div class="change-info__form form">
            <div class="form__item">
              <label class="form__label" for="title">Заголовок новини/звітності</label>
              <input class="form__input" type="text" id="title">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="info">Текст новини</label>
              <textarea class="form__textarea" id="info"></textarea>
            </div>
      
            <div class="form__item">
              <label class="form__label" for="img">Зображення для новини</label>
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
  const aboutInput = getElement<HTMLTextAreaElement>('#info');
  const imgInput = getElement<HTMLInputElement>('#img');

  if (!nameInput || !aboutInput || !imgInput) return;

  nameInput.value = newInfo.title;
  aboutInput.value = newInfo.info;

  setTimeout(() => {
    validate(nameInput, aboutInput, imgInput);
  }, 100);
}

function validate(nameInput: HTMLInputElement, aboutInput: HTMLTextAreaElement, imgInput: HTMLInputElement) {
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
        errorMessage: `Введіть заголовок новини/звітності`,
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: `Довжина заголовку повинна бути більше 1 літери`,
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: `Довжина заголовку повинна бути менше`,
      },
    ])
    .addField('#info', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле для заповнення`,
      },
      {
        rule: 'minLength',
        value: 200,
        errorMessage: 'Напишіть трохи більше інформації',
      },
    ]);

  validator.onSuccess(async () => {
    await updateProd(nameInput, aboutInput, imgInput);
    window.location.href = `/Kindred/one-new.html?id=${newId}`;
  });
}

async function updateProd(nameInput: HTMLInputElement, aboutInput: HTMLTextAreaElement, imgInput: HTMLInputElement) {
  const name = nameInput.value;
  const about = aboutInput.value;
  const file = imgInput?.files?.[0];

  try {
    if (!newId) return;

    const url = await uploadImage(file);
    const docRef = doc(db, 'news', newId);

    await updateDoc(docRef, {
      img: url,
      title: name,
      info: about,
    });
  } catch (error) {
    console.error(error);
  }
}

async function uploadImage(file: File | null = null): Promise<string> {
  if (!file) {
    if (!newId) throw new Error('Нет файла');
    const userData = await getDoc(doc(db, 'news', newId));
    if (!userData || !userData.data()?.img) throw new Error('Нет файла');

    return userData.data()?.img;
  }
  const storageRef = ref(storage, `news/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}

export async function removeNew(currentNewInfo: New, currentUserId: string) {
  if (!prodInfo || !changeBtnContainer) return;

  if (role === 'admin' || currentUserId === currentNewInfo.userId) {
    const removeBtn = getElement('.one-new__delete', changeBtnContainer);
    if (!removeBtn) return;

    removeBtn.addEventListener('click', async () => {
      await removeNewDb(currentNewInfo);
    });
  } else {
    changeBtnContainer.remove();
  }
}

async function removeNewDb(currentNewInfo: New) {
  try {
    const decodeUrl = decodeURIComponent(currentNewInfo.img);
    const filePath = decodeUrl.split('/o/')[1].split('?')[0];
    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);

    const docRef = doc(db, 'news', currentNewInfo.id);
    await deleteDoc(docRef);

    const userRef = doc(db, 'users', currentNewInfo.userId);
    await updateDoc(userRef, {
      myNews: arrayRemove(currentNewInfo.id),
    });

    window.location.href = '/Kindred/news.html';
  } catch (error) {
    console.error(error);
  }
}
