export interface ActualProd {
  id: string;
  img: string;
  title: string;
  goal: number;
  collected: number;
  userInfo: {
    name: string;
    surname: string;
    score: number;
  };
}

export interface Prod {
  id: string;
  img: string;
  title: string;
  goal: number;
  collected: number;
  userInfo: {
    name: string;
    surname: string;
    score: number;
  };
  discription: string;
  link: string;
}

export interface TopUser {
  id: string;
  img: string;
  name: string;
  surname: string;
  allCollections: number;
  succsesfulCollections: number;
  dateOfRegister: string;
  score: number;
}