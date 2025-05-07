import { getElement } from '../composables/use-call-dom.ts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../modules/firebace.ts';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const storedUserInfo = JSON.parse(localStorage.getItem('user') || '[]');
const nameInput = getElement<HTMLInputElement>('#title-new');
const aboutInput = getElement<HTMLTextAreaElement>('#new-text');
const imgInput = getElement<HTMLInputElement>('#new-img');

export async function createNew() {
  if (!nameInput || !aboutInput || !imgInput) return;

  const name = nameInput.value;
  const about = aboutInput.value;
  const img = imgInput?.files?.[0];

  if (!img) return;

  const url = await uploadImage(img);

  try {
    const docRef = await addDoc(collection(db, 'news'), {
      title: name,
      info: about,
      img: url,
      date: new Date().toLocaleDateString('ru-RU'),
      userId: storedUserInfo.id,
    });

    const userRef = doc(db, 'users', storedUserInfo.id);

    await updateDoc(userRef, {
      myNews: arrayUnion(docRef.id),
    });

    nameInput.value = '';
    aboutInput.value = '';
    imgInput.value = '';
  } catch (err) {
    console.error(err);
  }
}

async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error('Нет файла');

  const storageRef = ref(storage, `news/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}
