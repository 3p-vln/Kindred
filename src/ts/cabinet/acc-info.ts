import { getElement } from '../composables/use-call-dom.ts';
import { doc, updateDoc } from 'firebase/firestore';
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
    if(!file) return;

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
    console.log(error);
  }
}

async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error("Нет файла");

  const storageRef = ref(storage, `users/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}