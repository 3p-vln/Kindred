export interface ActualProd {
  id: string;
  img: string;
  title: string;
  goal: number;
  collected: number;
  userInfo: {
    id: string;
    name: string;
    surname: string;
    score: number;
  };
  date: string;
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

export interface Info {
  id: string;
  name: string;
  email: string;
  surname: string;
  dateOfRegister: string;
  about: string;
  city: string;
  dateOfBirth: string;
  img: string;
  phone: string;
  uid: string;
}

export interface User {
  id: string;
  about: string;
  city: string;
  dateOfBirth: string;
  dateOfRegister: string;
  email: string;
  img: string;
  myNews: string[];
  myProds: string[];
  name: string;
  phone: string;
  role: string;
  supportedProds: string[];
  surname: string;
  uid: string;
  score: number;
}

export interface Product {
  id: string;
  collected: number;
  discription: string;
  goal: number;
  img: string;
  link: string;
  status: boolean;
  title: string;
  userId: string;
  date: string;
}

export interface Payments {
  id: string;
  date: string;
  img: string;
  prodId: string;
  prodUserId: string;
  status: string;
  sum: string;
  userId: string;
}

export interface Pay {
  id: string;
  date: string;
  img: string;
  prod: {
    id: string;
    title: string;
    collected: number;
  };
  prodUserId: string;
  status: string;
  sum: string;
  user: {
    id: string;
    name: string;
    surname: string;
  };
}

export interface UserCard {
  id: string;
  img: string;
  name: string;
  surname: string;
  allCollections: number;
  succsesfulCollections: number;
  dateOfRegister: string;
  role: string;
  allProducts: string[];
}

export interface Application {
  id: string;
  about: string;
  city: string;
  date: string;
  email: string;
  userId: string;
  name: string;
  phone: string;
  surname: string;
  time: string;
}

export interface ApplicationInfo {
  id: string;
  about: string;
  city: string;
  dateOfBirth: string;
  email: string;
  userId: string;
  name: string;
  phone: string;
  surname: string;
  time: string;
  dateOfRegister: string;
  img: string;
}