import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getElement } from '../composables/use-call-dom.ts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../modules/firebace.ts';

const auth = getAuth();
const errorMsg = getElement('.form__error');

export async function logInUser() {
  const emailInput = getElement<HTMLInputElement>('#email');
  const passwordInput = getElement<HTMLInputElement>('#password');

  if (!emailInput || !passwordInput || !errorMsg) return;

  const email = emailInput.value;
  const password = passwordInput.value;

  const userData = await getDocs(collection(db, 'users'));
  const allUsers: {id: string, uid: string, role: string }[] = [];
  userData.forEach((doc) => {
    allUsers.push({
      id: doc.id,
      uid: doc.data().uid,
      role: doc.data().role,
    });
  });

  console.log(allUsers);

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userUid = user.user.uid;
    const currentUser = allUsers.find((item) => item.uid === userUid);
    errorMsg.style.opacity = '0';
    document.cookie = `UID = ${user.user.uid}`;
    document.cookie = `Role = ${currentUser?.role}`;
    if (currentUser?.role == 'admin') {
      console.log(user.user.uid);
      // window.location.href = '/Artist-NFT/for-owner.html';
    } else {
      console.log(user.user.uid);
      // window.location.href = '/Artist-NFT/client.html';
    }
  } catch (error) {
    errorMsg.innerText = 'Невірний логін або пароль'
    errorMsg.style.opacity = '1';
  }
}
