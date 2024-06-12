/* eslint-disable no-unused-expressions */
import { createRestaurantItemTemplate } from '../../templates/templates-creator';

/* eslint-disable class-methods-use-this */
class FavoriteRestaurantsView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
        <div id="restaurant-search-container">
          <input id="query" type="text">
   
          <div class="restaurant-result-container">
            <ul class="restaurants">
            </ul>
          </div>
        </div>
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  getFavoriteMovieTemplate() {
    return `
     <div class="content">
        <h2 class="content__heading">Your Liked Movie</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
        '',
      );
    } else {
      // eslint-disable-next-line no-unused-vars
      html = this._getEmptyMovieTemplate();
    }

    document.querySelector('.restaurants').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));

    document.getElementById('restaurants').dispatchEvent(new Event('restaurant:updates'));
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  // eslint-disable-next-line class-methods-use-this
  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantsView;
