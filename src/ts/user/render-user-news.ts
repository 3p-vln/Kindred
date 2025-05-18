import { getElement } from '../composables/use-call-dom.ts';
import { New, User } from '../../typings/interfaces.ts';
import { renderNewsAll } from '../components/render-news.ts';

const userName = getElement('.user-news__title span');

export async function renderUserNews(user: User, allNews: New[], allUsers: User[]) {
  if (!userName) return;

  userName.innerHTML = user.name + ' ' + user.surname;

  const filteredNews = allNews.filter((news) => news.userId === user.id);

  await renderNewsAll('.user-news__news', filteredNews, allUsers)
}
