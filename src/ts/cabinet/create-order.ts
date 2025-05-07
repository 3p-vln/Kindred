import { getElement } from '../composables/use-call-dom.ts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../modules/firebace.ts';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const nameInput = getElement<HTMLInputElement>('#title');
const goalInput = getElement<HTMLInputElement>('#goal');
const linkInput = getElement<HTMLInputElement>('#link');
const aboutInput = getElement<HTMLTextAreaElement>('#discription');
const imgInput = getElement<HTMLInputElement>('#img');

export async function createOrder() {
  if (!nameInput || !goalInput || !linkInput || !aboutInput || !imgInput) return;

  const name = nameInput.value;
  const goal = goalInput.value;
  const link = linkInput.value;
  const about = aboutInput.value;
  const img = imgInput?.files?.[0];

  if (!img) return;

  const url = await uploadImage(img);

  try {
    const docRef = await addDoc(collection(db, 'prods'), {
      title: name,
      discription: about,
      goal: Number(goal),
      link: link,
      img: url,
      collected: 0,
      status: false,
      userId: storedUserInfo.id,
      date: new Date().toLocaleDateString('ru-RU'),
    });

    const userRef = doc(db, 'users', storedUserInfo.id);

    await updateDoc(userRef, {
      myProds: arrayUnion(docRef.id),
    });

    nameInput.value = '';
    goalInput.value = '';
    linkInput.value = '';
    aboutInput.value = '';
    imgInput.value = '';
  } catch (err) {
    console.error(err);
  }
}

async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error('Нет файла');

  const storageRef = ref(storage, `prods/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}
