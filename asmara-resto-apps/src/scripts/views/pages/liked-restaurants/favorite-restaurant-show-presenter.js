class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this.__view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const resntaurants = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(resntaurants);
  }

  // eslint-disable-next-line class-methods-use-this
  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteRestaurantShowPresenter;
