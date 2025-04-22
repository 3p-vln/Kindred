import { getElement } from '../composables/use-call-dom.ts';

const range = getElement<HTMLInputElement>('#range');
const output = getElement<HTMLOutputElement>('.range-value');

export function setRange() {
  if (!range) return;
  changeRange();

  range.addEventListener('input', () => changeRange());
}

function changeRange() {
  if (!range || !output) return;

  const value = range.value;
  if (Number(value) == 5000) {
    output.value = 'до 5000';
  } else if (Number(value) == 1000000) {
    output.value = 'більше 1000000';
  } else {
    output.value = `від ${value}`;
  }

  const min = Number(range.min);
  const max = Number(range.max);
  if (!min || !max) return;

  const valuePercent = `${100 - ((max - Number(value)) / (max - min)) * 100}`;

  output.style.setProperty('--valRange', valuePercent + '%');
}
