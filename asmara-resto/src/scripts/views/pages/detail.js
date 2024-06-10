import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/templates-creator';
import '../../data/restaurantDetail';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-idb';

const Detail = {
  async render() {
    return `
      <main id="mainContent">
        <h2>Detail Restaurant</h2>
        <p>Anda lapar kami siap kenyangkan</p>

        <div id="detailRestaurant" class="restaurant-detail"></div>
        <div id="likeButtonContainer"></div>
      </main>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#detailRestaurant');
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          pictureId: restaurant.pictureId,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });

      // Focus to main content when skip to content is clicked
      const skipToContentButton = document.querySelector('.skip-to-content');
      if (skipToContentButton) {
        skipToContentButton.addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById('mainContent').focus();
        });
      }
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
    }
  },
};

export default Detail;
