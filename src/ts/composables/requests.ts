import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';
import { Application, Payments, Product, User } from '../../typings/interfaces.ts';

export async function getAllUsers() {
  try {
    const docRefUsers = await getDocs(collection(db, 'users'));
    const users: User[] = [];

    docRefUsers.forEach((doc) => {
      users.push({
        id: doc.id,
        about: doc.data().about || '',
        city: doc.data().city || '',
        dateOfBirth: doc.data().dateOfBirth || '',
        dateOfRegister: doc.data().dateOfRegister || '',
        email: doc.data().email || '',
        img: doc.data().img || '',
        myNews: doc.data().myNews || [],
        myProds: doc.data().myProds || [],
        name: doc.data().name || '',
        phone: doc.data().phone || '',
        role: doc.data().role || '',
        supportedProds: doc.data().supportedProds || [],
        surname: doc.data().surname || '',
        uid: doc.data().uid || '',
        score: doc.data().score || 0,
      });
    });

    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function getCurrentUsers(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    return {
      id: userSnap.id,
      about: userSnap.data()?.about || '',
      city: userSnap.data()?.city || '',
      dateOfBirth: userSnap.data()?.dateOfBirth || '',
      dateOfRegister: userSnap.data()?.dateOfRegister || '',
      email: userSnap.data()?.email || '',
      img: userSnap.data()?.img || '',
      myNews: userSnap.data()?.myNews || [],
      myProds: userSnap.data()?.myProds || [],
      name: userSnap.data()?.name || '',
      phone: userSnap.data()?.phone || '',
      role: userSnap.data()?.role || '',
      supportedProds: userSnap.data()?.supportedProds || [],
      surname: userSnap.data()?.surname || '',
      uid: userSnap.data()?.uid || '',
      score: userSnap.data()?.score || 0,
    };
  } catch (err) {
    console.error(err);
  }
}

export async function getAllProds() {
  try {
    const docRefProd = await getDocs(collection(db, 'prods'));
    const products: Product[] = [];

    docRefProd.forEach((doc) => {
      products.push({
        id: doc.id,
        collected: doc.data().collected || 0,
        discription: doc.data().discription || '',
        goal: doc.data().goal || 0,
        img: doc.data().img || '',
        link: doc.data().link || '',
        status: doc.data().status || '',
        title: doc.data().title || '',
        userId: doc.data().userId || '',
        date: doc.data().date || '',
      });
    });

    return products;
  } catch (err) {
    console.error(err);
  }
}

export async function getCurrentProd(prodId: string) {
  try {
    const prodRef = doc(db, 'prods', prodId);
    const prodSnap = await getDoc(prodRef);

    return {
      id: prodSnap.id,
      collected: prodSnap.data()?.collected || 0,
      discription: prodSnap.data()?.discription || '',
      goal: prodSnap.data()?.goal || 0,
      img: prodSnap.data()?.img || '',
      link: prodSnap.data()?.link || '',
      status: prodSnap.data()?.status || '',
      title: prodSnap.data()?.title || '',
      userId: prodSnap.data()?.userId || '',
      date: prodSnap.data()?.date || '',
    };
  } catch (err) {
    console.error(err);
  }
}

export async function getAllPayments() {
  try {
    const docRefPay = await getDocs(collection(db, 'payments'));
    const payments: Payments[] = [];

    docRefPay.forEach((doc) => {
      payments.push({
        id: doc.id,
        date: doc.data().date || '',
        img: doc.data().img || '',
        prodId: doc.data().prodId || '',
        prodUserId: doc.data().prodUserId || '',
        status: doc.data().status || '',
        sum: doc.data().sum || '',
        userId: doc.data().userId || '',
      });
    });

    return payments;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllApplications() {
  try {
    const docRefApplications = await getDocs(collection(db, 'applications'));
    const applications: Application[] = [];

    docRefApplications.forEach((doc) => {
      applications.push({
        id: doc.id,
        about: doc.data().about || '',
        city: doc.data().city || '',
        date: doc.data().date || '',
        email: doc.data().email || '',
        userId: doc.data().id || '',
        name: doc.data().name || '',
        phone: doc.data().phone || '',
        surname: doc.data().surname || '',
        time: doc.data().time || '',
      });
    });

    return applications;
  } catch (err) {
    console.error(err);
  }
}