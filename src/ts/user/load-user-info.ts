import { Product, User, UserAllInfo } from '../../typings/interfaces.ts';
import { getElement } from '../composables/use-call-dom.ts';

const imgContent = getElement<HTMLImageElement>('.avatar__img img');
const reit = getElement('.avatar__reit span');
const nameInfo = getElement('.info__name');
const allOrders = getElement('.info__all span');
const succsessOrders = getElement('.info__success span');
const aboutInfo = getElement('.info__about');

export async function loadUserInfo(user: User, allProd: Product[]) {
   let userScore = 0;

  user.score.forEach((sc) => {
    userScore += Number(sc);
  });

  const totalScore = userScore / user.score.length;

  const userTop: UserAllInfo = {
    id: user.id,
    img: user.img,
    name: user.name,
    surname: user.surname,
    allCollections: user.myProds.length,
    succsesfulCollections: 0,
    dateOfRegister: user.dateOfRegister,
    score: Math.round(totalScore),
    about: user.about,
  };

  user.myProds.forEach((prod) => {
    allProd.forEach((product) => {
      if (product.id === prod && product.status) userTop.succsesfulCollections++;
    });
  });

  renderInfo(userTop);
}

function renderInfo(user: UserAllInfo){
  if (!imgContent || !reit || !nameInfo || !allOrders || !succsessOrders || !aboutInfo) return;

  imgContent.src = user.img;
  reit.innerText = user.score.toString();

  nameInfo.innerText = user.name + " " + user.surname;
  allOrders.innerText = user.allCollections.toString();
  succsessOrders.innerText = user.succsesfulCollections.toString();
  aboutInfo.innerText = user.about;
}