import { getElement } from '../composables/use-call-dom.ts';

export function stopPreload(){
  const loadingIsFinished = new Event('loadingIsFinished');
  document.dispatchEvent(loadingIsFinished);
}

export function preloader() {
  setTimeout(() => {
    const loader = getElement('.preloader');
    loader?.classList.add('preloader_loaded');
  }, 1500);
}