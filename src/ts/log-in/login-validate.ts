import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { logInUser } from './log-user.ts';

export function validateLogInForm() {
  const form = getElement<HTMLFormElement>('#log-in');
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
    await logInUser();
  });
}
