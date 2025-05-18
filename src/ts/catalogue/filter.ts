import { getElement, getElements } from '../composables/use-call-dom.ts';
import { ActualProd, Product, User } from '../../typings/interfaces.ts';
import { renderCard } from '../components/render-prod-cards.ts';

const scoreRadio = getElements('.filter__list_score input[type="radio"]');
const dateRadio = getElements('.filter__list_date input[type="radio"]');

let selectedScore: number | null = null;
let selectedDateOrder: 'asc' | 'desc' | null = null;

export function filterProd(allProds: Product[], allUsers: User[]) {
  scoreRadio.forEach((score) => {
    score.addEventListener('change', () => {
      selectedScore = getScoreFromId(score.id);
      applyFilters(allProds, allUsers);
    });
  });

  dateRadio.forEach((date) => {
    date.addEventListener('change', () => {
      selectedDateOrder = date.id === 'up' ? 'asc' : 'desc';
      applyFilters(allProds, allUsers);
    });
  });
}

function getScoreFromId(id: string): number {
  switch (id) {
    case 'five':
      return 5;
    case 'four':
      return 4;
    case 'three':
      return 3;
    case 'two':
      return 2;
    case 'one':
      return 1;
    default:
      return 0;
  }
}

function applyFilters(allProds: Product[], allUsers: User[]) {
  const container = getElement('.prod-list__content');
  if (!container) return;

  let actualProd: ActualProd[] = [];

  allProds.forEach((prod) => {
    const user = allUsers.find((u) => u.id === prod.userId);
    if (user && !prod.status) {
      let userScore = 0;

      user.score.forEach((sc) => {
        userScore += Number(sc);
      });

      const totalScore = userScore / user.score.length;

      actualProd.push({
        id: prod.id,
        img: prod.img,
        title: prod.title,
        goal: prod.goal,
        collected: prod.collected,
        userInfo: {
          id: user.id,
          name: `${user.name || '-'}.`,
          surname: user.surname,
          score: Math.round(totalScore),
        },
        date: prod.date,
      });
    }
  });

  if (selectedScore !== null) {
    actualProd = actualProd.filter((prod) => Number(prod.userInfo.score) === selectedScore);
  }

  if (selectedDateOrder === 'asc') {
    actualProd.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
  } else if (selectedDateOrder === 'desc') {
    actualProd.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  }

  container.innerHTML = '';

  if (actualProd.length === 0) {
    container.innerHTML = `Не знайдено зборів за заданим фільтром.`;
  } else {
    actualProd.forEach((prod) => {
      renderCard(prod, container);
    });
  }
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}
