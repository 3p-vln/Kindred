import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import { done } from './done-pop-up.ts';
import { createNew } from './create-new.ts';
export function validateCreateNewForm() {
  const form = getElement<HTMLFormElement>('#create-new-form');
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
    .addField('#title-new', [
      {
        rule: 'required',
        errorMessage: `Введіть назву новини`,
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
    .addField('#new-text', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле для заповнення`,
      },
      {
        rule: 'minLength',
        value: 20,
        errorMessage: 'Напишіть трохи більше інформації',
      },
    ])
    .addField('#new-img', [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Будь ласка, додайте файл',
      },
    ]);

  validator.onSuccess(async () => {
    await createNew();
    done('новина');
  });
}
