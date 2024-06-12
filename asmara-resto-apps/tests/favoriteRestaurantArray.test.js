/* eslint-disable eqeqeq */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {
  getRestaurants(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return, eqeqeq
    return favoriteRestaurant.find((restaurant) => restaurant.id == id);
  },
  getAllRestaurants() {
    return favoriteRestaurant;
  },

  putRestaurants(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getRestaurants(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurants(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    // eslint-disable-next-line eqeqeq
    favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurants()
      .filter((restaurant) => {
        const loweredCaseRestaurantTitle = (restaurant.title || '-').toLowerCase();
        const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantTitle.indexOf(jammedQuery) != -1;
      });
  },
};

// eslint-disable-next-line no-undef
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  // eslint-disable-next-line no-undef
  afterEach(() => {
    favoriteRestaurant = [];
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
