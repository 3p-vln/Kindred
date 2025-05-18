import { getElement, renderElement } from '../composables/use-call-dom.ts';
import { New, NewShortInfo, User } from '../../typings/interfaces.ts';

export async function renderNewsAll(containerName: string, allNews: New[], allUsers: User[]) {
  const container = getElement(containerName);
  const newsAll: NewShortInfo[] = [];

  allNews.forEach((news) => {
    allUsers.forEach((user) => {
      if (news.userId == user.id) {
        newsAll.push({
          id: news.id,
          img: news.img,
          title: news.title,
          info: news.info,
          userInfo: {
            id: user.id,
            name: `${user.name || '-'}.`,
            surname: user.surname,
          },
          date: news.date,
        });
      }
    });
  });

  if (!container) return;

  container.innerHTML = '';

  if (newsAll.length === 0) {
    container.innerHTML = 'Звітність відсутня';
    return
  }

  newsAll.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()).forEach((news) => {
    renderCard(news, container);
  });
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day); // месяц от 0 до 11
}

function shortenText(text: string, maxSentences: number = 3): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;

  const shortened = sentences.slice(0, maxSentences).join(' ').trim();
  return sentences.length > maxSentences ? shortened + '...' : shortened;
}

export function renderCard(news: NewShortInfo, container: HTMLElement) {
  const newsCard = renderElement<HTMLAnchorElement>('a', ['new', `new_${news.id}`]);

  const newImg = renderElement('div', 'new__img');
  newImg.innerHTML = `
    <img src="${news.img}" alt="new"/>
  `

  const newInfo = renderElement('div', 'new__info');

  const newTitle = renderElement('p', 'new__title');
  newTitle.innerText = news.title;

  const newText = renderElement('p', 'new__text');
  newText.innerText =shortenText(news.info, 4);

  const newDate = renderElement('p', 'new__date');
  newDate.innerText = news.date;

  const newBtn = renderElement('a', ['new__btn', 'btn', 'btn_orange']);
  newBtn.innerText = 'Переглянути';

  newInfo.appendChild(newTitle);
  newInfo.appendChild(newText);
  newInfo.appendChild(newDate);
  newInfo.appendChild(newBtn);

  newsCard.appendChild(newImg);
  newsCard.appendChild(newInfo);

  container.appendChild(newsCard);
}
