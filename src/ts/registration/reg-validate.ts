import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { registerUser } from './add-reg-user.ts';

export function validateRegForm() {
  const form = getElement<HTMLFormElement>('#registration');
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
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: `Введіть ваше ім'я`,
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: `Довжина ім'я повинна бути більше 1 літери`,
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: `Довжина ім'я повинна бути менше`,
      },
      {
        rule: 'customRegexp',
        value: /^[\p{L}’'\-]+$/u,
        errorMessage: `Допускаються тільки літери, апостроф та дефіс`,
      },
    ])
    .addField('#surname', [
      {
        rule: 'required',
        errorMessage: `Введіть ваше прізвище`,
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: `Довжина прізвища повинна бути більше 1 літери`,
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: `Довжина прізвища повинна бути менше`,
      },
      {
        rule: 'customRegexp',
        value: /^[\p{L}]+$/u,
        errorMessage: `Допускаються тільки літери`,
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле`,
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/,
        errorMessage: 'Перевірте правильність написання пошти',
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле`,
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: 'Пароль повинен містити більше 8 знаків',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Пароль повинен бути менше 50 знаків',
      },
      {
        rule: 'customRegexp',
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        errorMessage: 'Пароль повинен містити великі, маленькі літери та числа',
      },
    ]);

  validator.onSuccess(async () => {
    await registerUser();
  });
}
