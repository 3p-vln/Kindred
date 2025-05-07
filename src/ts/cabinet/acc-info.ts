import { getElement } from '../composables/use-call-dom.ts';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../modules/firebace.ts';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addUserToLocalStorage } from '../registration/add-reg-user.ts';
import Cookies from 'js-cookie';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const nameInput = getElement<HTMLInputElement>('#name');
const surnameInput = getElement<HTMLInputElement>('#surname');
const dateOfBirdthInput = getElement<HTMLInputElement>('#date');
const cityInput = getElement<HTMLInputElement>('#city');
const phoneInput = getElement<HTMLInputElement>('#phone');
const emailInput = getElement<HTMLInputElement>('#email');
const aboutInput = getElement<HTMLInputElement>('#about');
const photoInput = getElement<HTMLInputElement>('#photo');
const token = Cookies.get('UID');

export function autoFillInp() {
  if (!nameInput || !surnameInput || !dateOfBirdthInput || !cityInput || !phoneInput || !emailInput || !aboutInput) return;

  nameInput.value = storedUserInfo.name;
  surnameInput.value = storedUserInfo.surname;
  dateOfBirdthInput.value = storedUserInfo.dateOfBirth;
  cityInput.value = storedUserInfo.city;
  phoneInput.value = storedUserInfo.phone;
  emailInput.value = storedUserInfo.email;
  aboutInput.value = storedUserInfo.about;
}

export async function changeInfo() {
  try {
    const docRef = doc(db, 'users', storedUserInfo.id);

    const file = photoInput?.files?.[0];

    const url = await uploadImage(file);

    await updateDoc(docRef, {
      name: nameInput?.value || '',
      surname: surnameInput?.value || '',
      dateOfBirth: dateOfBirdthInput?.value || '',
      city: cityInput?.value || '',
      phone: phoneInput?.value || '',
      email: emailInput?.value || '',
      about: aboutInput?.value || '',
      img: url || ''
    });

    if(!token) return;
    await addUserToLocalStorage(token);
  } catch (error){
    console.error(error);
  }
}

async function uploadImage(file: File | null = null): Promise<string> {
  if (!file) {
    const userData = await getDoc(doc(db, 'users', storedUserInfo.id));
    if (!userData) throw new Error('Нет файла');
    if(!userData.data()?.img) return 'https://firebasestorage.googleapis.com/v0/b/kindred-4b120.firebasestorage.app/o/users%2Funnamed.jpg?alt=media&token=3a5e0dbc-a6db-46dd-bced-cb0819533b37';

    return userData.data()?.img;
  }
  const storageRef = ref(storage, `users/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}