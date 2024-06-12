import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/templates-creator';

const NowResto = {
  async render() {
    return `
      <h2>Welcome to Asmara Resto</h2>
      <p>Anda lapar kami siap kenyangkan</p>
      <img class="hero" />
      <h1 class="title-rest">Explore Restoran</h1>
      <div id="restaurantList">
        <!-- Tempat untuk menampilkan daftar restoran -->
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();
    const restaurantsContainer = document.querySelector('#restaurantList');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default NowResto;
