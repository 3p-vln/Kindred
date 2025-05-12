import { getElement } from '../composables/use-call-dom.ts';
import JustValidate from 'just-validate';
import IMask, { MaskedDynamic, MaskedPattern } from 'imask';
import { applyForm } from './send-form.ts';
import { done } from './done-pop-up.ts';

export function validateForm() {
  const form = getElement<HTMLFormElement>('#want-to-be');
  if (!form) return;

  applyMask();

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
    .addField('#date', [
      {
        rule: 'required',
        errorMessage: 'Це поле обовʼязкове',
      },
      {
        rule: 'customRegexp',
        value: /^(0?[1-9]|[12][0-9]|3[01])[.\-\/](0?[1-9]|1[0-2])[.\-\/](19|20)\d{2}$/,
        errorMessage: 'Введіть правильну дату у форматі дд.мм.рррр',
      },
    ])
    .addField('#city', [
      {
        rule: 'required',
        errorMessage: `Введіть маше місто проживання`,
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: `Довжина міста повинна бути більше 1 літери`,
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: `Довжина міста повинна бути менше`,
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
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: `Це обов'язкове поле`,
      },
      {
        rule: 'custom',
        validator: (value: string) => {
          const startsWith = [
            { mask: '+{1} (000) 000-0000', startsWith: '1' }, // США/Канада
            { mask: '+{7} (000) 000-00-00', startsWith: '7' }, // Россия/Казахстан
            { mask: '+{380} (00) 000-00-00', startsWith: '380' }, // Украина
            { mask: '+{44} (0000) 000000', startsWith: '44' }, // Великобритания
            { mask: '+{49} (000) 000-0000', startsWith: '49' }, // Германия
            { mask: '+{86} (000) 0000-0000', startsWith: '86' }, // Китай
            { mask: '+{33} (0) 0 00 00 00 00', startsWith: '33' }, // Франция
            { mask: '+{39} 0 000 000 000', startsWith: '39' }, // Италия
            { mask: '+{34} 000 000 000', startsWith: '34' }, // Испания
            { mask: '+{61} (0) 0000 0000', startsWith: '61' }, // Австралия
            { mask: '+{81} (0) 0-0000-0000', startsWith: '81' }, // Япония
            { mask: '+{91} 0000 000 000', startsWith: '91' }, // Индия
            { mask: '+{52} (0) 000 0000 0000', startsWith: '52' }, // Мексика
            { mask: '+{55} (0) 00 0000-0000', startsWith: '55' }, // Бразилия
            { mask: '+{82} (0) 0-0000-0000', startsWith: '82' }, // Южная Корея
            { mask: '+{90} 000 000 00 00', startsWith: '90' }, // Турция
            { mask: '+{27} 000 000 000', startsWith: '27' }, // Южноафриканская Республика
            { mask: '+{64} 0 000 000 000', startsWith: '64' }, // Новая Зеландия
            { mask: '+{65} 0000 0000', startsWith: '65' }, // Сингапур
            { mask: '+{48} 000 000 000', startsWith: '48' }, // Польша
          ];

          // Проверяем, начинается ли введенный номер с подходящих цифр
          const cleanedValue = value.replace(/\D/g, ''); // Убираем все нецифровые символы

          return startsWith.some((mask) => cleanedValue.startsWith(mask.startsWith));
        },
        errorMessage: 'Номер телефону має починатися з одного з дійсних кодів країни',
      },
    ])
    .addField('#about', [
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
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: `Дайте згоду на обробку інформації`,
      },
    ]);

  validator.onSuccess(async () => {
    await applyForm();
    done();
  });
}

function applyMask() {
  const phoneInput = getElement<HTMLInputElement>('#phone')
  if(!phoneInput) return;

  type MaskWithStartsWith = { mask: string; startsWith: string };

  IMask(phoneInput, {
    mask: [
      { mask: '+{1} (000) 000-0000', startsWith: '1' }, // США/Канада
      { mask: '+{7} (000) 000-00-00', startsWith: '7' }, // Россия/Казахстан
      { mask: '+{380} (00) 000-00-00', startsWith: '380' }, // Украина
      { mask: '+{44} (0000) 000000', startsWith: '44' }, // Великобритания
      { mask: '+{49} (000) 000-0000', startsWith: '49' }, // Германия
      { mask: '+{86} (000) 0000-0000', startsWith: '86' }, // Китай
      { mask: '+{33} (0) 0 00 00 00 00', startsWith: '33' }, // Франция
      { mask: '+{39} 0 000 000 000', startsWith: '39' }, // Италия
      { mask: '+{34} 000 000 000', startsWith: '34' }, // Испания
      { mask: '+{61} (0) 0000 0000', startsWith: '61' }, // Австралия
      { mask: '+{81} (0) 0-0000-0000', startsWith: '81' }, // Япония
      { mask: '+{91} 0000 000 000', startsWith: '91' }, // Индия
      { mask: '+{52} (0) 000 0000 0000', startsWith: '52' }, // Мексика
      { mask: '+{55} (0) 00 0000-0000', startsWith: '55' }, // Бразилия
      { mask: '+{82} (0) 0-0000-0000', startsWith: '82' }, // Южная Корея
      { mask: '+{90} 000 000 00 00', startsWith: '90' }, // Турция
      { mask: '+{27} 000 000 000', startsWith: '27' }, // Южноафриканская Республика
      { mask: '+{64} 0 000 000 000', startsWith: '64' }, // Новая Зеландия
      { mask: '+{65} 0000 0000', startsWith: '65' }, // Сингапур
      { mask: '+{48} 000 000 000', startsWith: '48' }, // Польша
      { mask: '+000 (00) 000-00-00', startsWith: '' },
    ] as MaskWithStartsWith[],

    dispatch: (appended: string, dynamicMasked: MaskedDynamic<MaskedPattern>) => {
      let number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find((m) => (m as unknown as MaskWithStartsWith).startsWith && number.startsWith((m as unknown as MaskWithStartsWith).startsWith)) || dynamicMasked.compiledMasks[dynamicMasked.compiledMasks.length - 1];
    },
  });
}