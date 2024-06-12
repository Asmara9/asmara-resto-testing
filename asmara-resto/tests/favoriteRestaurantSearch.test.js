import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb';

// eslint-disable-next-line no-undef
describe('Searching restaurants', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="restaurant-search-container">
          <input id="query" type="text">
          <div class="restaurant-result-container">
            <ul class="restaurants">
            </ul>
          </div>
        </div>
      `;
  });

  // eslint-disable-next-line no-undef
  it('should be able to capture the query typed by the user', () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    // eslint-disable-next-line max-len
    const presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants: FavoriteRestaurantIdb });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restoran a';

    queryElement.dispatchEvent(new Event('change'));

    // eslint-disable-next-line no-undef
    expect(presenter.latestQuery).toEqual('restoran a');
  });

  // eslint-disable-next-line no-undef
  it('should ask the model to search for liked restaurants', () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');

    // eslint-disable-next-line no-unused-vars, max-len
    const presenter = new FavoriteRestaurantSearchPresenter({ FavoriteRestaurants: FavoriteRestaurantIdb });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restoran a';

    queryElement.dispatchEvent(new Event('change'));

    // eslint-disable-next-line no-undef
    expect(FavoriteRestaurantIdb.searchRestaurants).toHaveBeenCalledWith('restoran a');
  });
});
