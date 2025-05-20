import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { getElement } from '../composables/use-call-dom.ts';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { Info } from '../../typings/interfaces.ts';

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
    await addDoc(collection(db, 'users'), {
      uid: user.user.uid,
      role: 'customer',
      name: name,
      email: email,
      surname: surname,
      dateOfRegister: new Date().toLocaleDateString('ru-RU'),
      about: '',
      city: '',
      dateOfBirth: '',
      img: 'https://firebasestorage.googleapis.com/v0/b/kindred-4b120.firebasestorage.app/o/users%2Funnamed.jpg?alt=media&token=3a5e0dbc-a6db-46dd-bced-cb0819533b37',
      phone: '',
      score: [3],
    });
    document.cookie = `UID = ${user.user.uid}; max-age=259200; path=/`;
    document.cookie = `Role = customer; max-age=259200; path=/`;
    await addUserToLocalStorage(user.user.uid);
    window.location.href = '/Kindred/cabinet-user.html';
  } catch (error) {
    showDbError(error);
  }
}

function showDbError(error: any) {
  const errorMsg = getElement('.form__error');

  if (!errorMsg) return;

  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      errorMsg.innerText = 'Користувач з даною поштою вже зареєстрований';
      errorMsg.style.opacity = '1';
      break;
    default:
      errorMsg.innerText = 'Помилка при створенні аккаунту. Повторіть спробу пізніше';
      errorMsg.style.opacity = '1';
      break;
  }
}

export async function addUserToLocalStorage(uid: string) {
  const userData = await getDocs(collection(db, 'users'));
  const allUsers: Info[] = [];
  userData.forEach((doc) => {
    allUsers.push({
      id: doc.id,
      uid: doc.data().uid,
      name: doc.data().name || '',
      email: doc.data().email || '',
      surname: doc.data().surname || '',
      dateOfRegister: doc.data().dateOfRegister || '',
      about: doc.data().about || '',
      city: doc.data().city || '',
      dateOfBirth: doc.data().dateOfBirth || '',
      img: doc.data().img || '',
      phone: doc.data().phone || '',
    });
  });

  const currentUser = allUsers.find((item) => item.uid === uid);

  if (!currentUser) return;

  localStorage.setItem(
    'user',
    JSON.stringify({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      surname: currentUser.surname,
      dateOfRegister: currentUser.dateOfRegister,
      about: currentUser.about,
      city: currentUser.city,
      dateOfBirth: currentUser.dateOfBirth,
      img: currentUser.img,
      phone: currentUser.phone,
    })
  );
}
