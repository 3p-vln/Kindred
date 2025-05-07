import { getElement, getElements } from '../composables/use-call-dom.ts';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const nameInput = getElement<HTMLInputElement>('#name');
const surnameInput = getElement<HTMLInputElement>('#surname');
const dateInput = getElement<HTMLInputElement>('#date');
const cityInput = getElement<HTMLInputElement>('#city');
const phoneInput = getElement<HTMLInputElement>('#phone');
const emailInput = getElement<HTMLInputElement>('#email');
const aboutInput = getElement<HTMLInputElement>('#about');
const timeInputs = getElements<HTMLInputElement>('input[name="time"]');

export function setValue() {
  if (!nameInput || !surnameInput || !dateInput || !cityInput || !phoneInput || !emailInput || !aboutInput || !timeInputs) return;

  nameInput.value = storedUserInfo.name;
  surnameInput.value = storedUserInfo.surname;
  dateInput.value = storedUserInfo.dateOfBirth;
  cityInput.value = storedUserInfo.city;
  phoneInput.value = storedUserInfo.phone;
  emailInput.value = storedUserInfo.email;
  aboutInput.value = storedUserInfo.about;
}