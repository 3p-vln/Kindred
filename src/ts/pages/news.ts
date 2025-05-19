import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { getAllNews, getAllUsers } from '../composables/requests.ts';
import { renderNewsAll } from '../components/render-news.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const allUsers = await getAllUsers();
  const allNews = await getAllNews();

  if (!allNews || !allUsers) return;
  await renderNewsAll('.news-list__content', allNews, allUsers);

  burgerMenu();

  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
