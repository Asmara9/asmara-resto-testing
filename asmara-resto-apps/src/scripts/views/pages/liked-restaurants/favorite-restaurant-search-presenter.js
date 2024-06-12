/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._favoriteRestaurants = favoriteRestaurants;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this.searchRestaurants(latestQuery);
    });
  }

  async searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }

    this._showFoundRestaurants(foundRestaurants);
  }

  // eslint-disable-next-line no-unused-vars
  _showFoundRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
      // eslint-disable-next-line no-unused-vars
        (carry, restaurant) => carry.concat(`
      <li class="restaurant">
        <span class="restaurant__title">${restaurant.title || '-'}</span>
      </li>
      `),
        '',
      );
    } else {
      html = '<div class="restaurants__not__found">Restaurant tidak ditemukan</div>';
    }

    document.querySelector('.restaurants').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
