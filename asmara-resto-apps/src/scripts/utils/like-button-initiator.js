import FavoriteRestaurantIdb from '../data/favorite-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/templates-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this.restaurant;

    if (await this._isRestaurantsExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantsExist(id) {
    const Restaurants = await FavoriteRestaurantIdb.getRestaurants(id);
    return !!Restaurants;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurants(this.restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurants(this.restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
