import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { getElement } from '../composables/use-call-dom.ts';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';

const auth = getAuth();

export async function registerUser() {
  const emailInput = getElement<HTMLInputElement>('#email');
  const passwordInput = getElement<HTMLInputElement>('#password');
  const nameInput = getElement<HTMLInputElement>('#name');
  const surnameInput = getElement<HTMLInputElement>('#surname');

  if (!emailInput || !passwordInput || !nameInput || !surnameInput) return;

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const surname = surnameInput.value;

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userAdd = await addDoc(collection(db, 'users'), {
      uid: user.user.uid,
      role: 'customer',
      name: name,
      email: email,
      surname: surname,
      dateOfRegister: new Date().toISOString(),
      about: '',
      city: '',
      dateOfBirth: '',
      img: '',
      phone: '',
    });
    console.log('Document written with ID: ', userAdd.id);
    console.log(user.user.uid);
    document.cookie = `UID = ${user.user.uid}`;
    document.cookie = `Role = customer`;
  } catch (error) {
    showDbError(error);
  }
}

function showDbError(error: any) {
  const errorMsg = getElement('.form__error');

  if (!errorMsg) return;

  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      errorMsg.innerText = 'Користувач з даною поштою вже зареєстрований'
      errorMsg.style.opacity = '1';
      break;
    default:
      errorMsg.innerText = 'Помилка при створенні аккаунту. Повторіть спробу пізніше'
      errorMsg.style.opacity = '1';
      break;
  }
}
