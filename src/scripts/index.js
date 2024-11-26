// File: src/scripts/index.js
import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import ToastInitiator from './utils/toast-initiator';

const app = new App({
  button: document.querySelector('.menu-toggle'),
  drawer: document.querySelector('#sidebar'),
  content: document.querySelector('#main-content'),
});

ToastInitiator.init();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
