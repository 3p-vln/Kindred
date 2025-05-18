import { burgerMenu } from '../components/header';
import { preloader, stopPreload } from '../components/preloader.ts';
import { getAllNews, getAllProds, getAllUsers, getCurrentUsers } from '../composables/requests.ts';
import { loadUserInfo } from '../user/load-user-info.ts';
import { openPopUp } from '../user/score-popup.ts';
import { renderUserProds } from '../user/render-user-prods.ts';
import { renderUserNews } from '../user/render-user-news.ts';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id') || undefined;

document.addEventListener('DOMContentLoaded', async () => {
  if(!userId) return;
  const actualProds = await getAllProds();
  const user = await getCurrentUsers(userId);
  const allUsers = await getAllUsers();
  const allNews = await getAllNews();

  if(!actualProds || !user || !allUsers || !allNews) return;

  await loadUserInfo(user, actualProds);
  await renderUserProds(user, actualProds, allUsers)
  await renderUserNews(user, allNews, allUsers)

  burgerMenu();
  openPopUp(user);

  stopPreload();
});

document.addEventListener('loadingIsFinished', () => {
  preloader();
});
