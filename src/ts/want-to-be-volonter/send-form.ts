import { getElement, getElements } from '../composables/use-call-dom.ts';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';

const nameInput = getElement<HTMLInputElement>('#name');
const surnameInput = getElement<HTMLInputElement>('#surname');
const dateInput = getElement<HTMLInputElement>('#date');
const cityInput = getElement<HTMLInputElement>('#city');
const phoneInput = getElement<HTMLInputElement>('#phone');
const emailInput = getElement<HTMLInputElement>('#email');
const aboutInput = getElement<HTMLInputElement>('#about');
const timeInputs = getElements<HTMLInputElement>('input[name="time"]');

export async function applyForm() {
  if (!nameInput || !surnameInput || !dateInput || !cityInput || !phoneInput || !emailInput || !aboutInput || !timeInputs) return;

  const name = nameInput.value;
  const surname = surnameInput.value;
  const date = dateInput.value;
  const city = cityInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;
  const about = aboutInput.value;
  let time;

  timeInputs.forEach((timeInp) => {
    if (timeInp.checked) {
      switch (timeInp.id) {
        case 'all-time':
          time = 'Постійно';
          break;
        case 'some-time':
          time = 'Частково';
          break;
        case 'one-time':
          time = 'Разово';
          break;
        case 'when-can':
          time = 'Коли зможу';
          break;
      }
    }
  });

  try {
    await addDoc(collection(db, 'applications'), {
      name: name,
      surname: surname,
      date: date,
      city: city,
      phone: phone,
      email: email,
      about: about,
      time: time,
      //изменить когда будет авторизация регистрация
      uid: time,
    });
    alert('Данные отправлены!');
  } catch (err) {
    console.error(err);
  }
}
