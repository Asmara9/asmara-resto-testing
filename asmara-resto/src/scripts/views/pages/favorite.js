import FavoriteRestaurantIdb from '../../data/favorite-idb';
import { createRestaurantItemTemplate } from '../templates/templates-creator';
import '../../data/restaurantList'; // Import the web component

const Favorite = {
  async render() {
    return `
      <main id="mainContent">
        <div class="content">
          <h2 class="content__heading">Your Liked Restaurant</h2>
          <p>Anda lapar kami siap kenyangkan</p>
          <div id="restaurantList"></div>
        </div>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurantList');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    // Focus to main content when skip to content is clicked
    const skipToContentButton = document.querySelector('.skip-to-content');
    if (skipToContentButton) {
      skipToContentButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('mainContent').focus();
      });
    }
  },
};

export default Favorite;
