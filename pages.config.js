import { resolve } from 'path';

const pages = [
  {
    name: 'index',
    path: resolve(__dirname, 'index.html'),
  },
  {
    name: 'catalogue',
    path: resolve(__dirname, 'catalogue.html'),
  },
  {
    name: 'prod',
    path: resolve(__dirname, 'prod.html'),
  },
  {
    name: 'want-to-be-volonter',
    path: resolve(__dirname, 'want-to-be-volonter.html'),
  },
];

export default pages;
