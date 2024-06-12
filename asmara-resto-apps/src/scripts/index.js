import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import FooterToolsInitiator from './utils/footer-tools-initiator';
import CONFIG from './globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 0;

const generateImage = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = START; i < START + NUMBER_OF_IMAGES; i++) {
    const img = document.createElement('img');
    img.src = `https://restaurant-api.dicoding.dev/images/medium/${i}`;
    img.alt = `Image ${i}`;
    img.loading = 'lazy';
    document.body.appendChild(img);
  }
};

generateImage();

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);

  // Initialize footer tools
  FooterToolsInitiator.init({
    subscribeButton: document.querySelector('#subscribePushNotification'),
    unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
  });
});

// Ambil data dari file JSON
// fetch('data/DATA.json')
//   .then(response => response.json())
//   .then(data => {
//     // Dapatkan elemen div tempat kita akan menampilkan daftar restoran
//     const restaurantList = document.getElementById('restaurantList');

//     // Loop melalui setiap restoran dalam data
//     data.restaurants.forEach(restaurant => {
//       // Buat elemen div untuk setiap restoran
//       const restaurantDiv = document.createElement('div');
//       restaurantDiv.classList.add('restaurant');

//       // Tambahkan informasi restoran ke dalam elemen div
//       restaurantDiv.innerHTML = `
//         <h2>${restaurant.name}</h2>
//         <img src="${restaurant.pictureId}" alt="${restaurant.name}">
//         <p class="Kota">Kota: ${restaurant.city}</p>
//         <p>Rating: ${restaurant.rating}</p>
//         <p>Deskripsi: ${restaurant.description}</p>
//       `;

//       // Tambahkan elemen div restoran ke dalam div daftar restoran
//       restaurantList.appendChild(restaurantDiv);
//     });
//   })
//   .catch(error => console.error('Error:', error));
