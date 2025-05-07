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
  {
    name: 'log-in',
    path: resolve(__dirname, 'log-in.html'),
  },
  {
    name: 'registration',
    path: resolve(__dirname, 'registration.html'),
  },
  {
    name: 'cabinet-user',
    path: resolve(__dirname, 'cabinet-user.html'),
  },
  {
    name: 'cabinet-volunteer',
    path: resolve(__dirname, 'cabinet-volunteer.html'),
  },
  {
    name: 'cabinet-admin',
    path: resolve(__dirname, 'cabinet-admin.html'),
  },
];

export default pages;
