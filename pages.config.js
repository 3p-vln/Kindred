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
];

export default pages;
