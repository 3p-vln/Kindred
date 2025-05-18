import { getElement } from '../composables/use-call-dom.ts';
import { Product, User } from '../../typings/interfaces.ts';
import { renderProdUsersAll } from '../components/render-prod-cards.ts';

const userName = getElement('.user-prods__title span');

export async function renderUserProds(user: User, allProds: Product[], allUsers: User[]) {
  if(!userName) return;

  userName.innerHTML = user.name + ' ' + user.surname;

  const filteredProds = allProds.filter(prod => prod.userId === user.id);

  console.log(filteredProds);

  await renderProdUsersAll('.user-prods__prods', filteredProds, allUsers);
}