/* eslint-disable no-new */
// import { createRestaurantItemTemplate } from '../templates/templates-creator';
import '../../data/restaurantList'; // Import the web component
import FavoriteRestaurantsView from './liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-idb';

const view = new FavoriteRestaurantsView();

const Favorite = {
  async render() {
    return view.getFavoriteMovieTemplate();
    // return `
    //   <main id="mainContent">
    //     <div class="content">
    //       <h2 class="content__heading">Your Liked Restaurant</h2>
    //       <p>Anda lapar kami siap kenyangkan</p>
    //       <div id="restaurantList"></div>
    //     </div>
    //   </main>
    // `;
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    // const restaurantsContainer = document.querySelector('#restaurantList');

    // restaurants.forEach((restaurant) => {
    //   restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    // });

    // // Focus to main content when skip to content is clicked
    // const skipToContentButton = document.querySelector('.skip-to-content');
    // if (skipToContentButton) {
    //   skipToContentButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     document.getElementById('mainContent').focus();
    //   });
    // }
  },
};

export default Favorite;
