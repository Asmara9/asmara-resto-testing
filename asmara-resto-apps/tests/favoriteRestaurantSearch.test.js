/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
// eslint-disable-next-line no-unused-vars
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb';
import FavoriteRestaurantsView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

// eslint-disable-next-line no-undef
describe('Searching restaurants', () => {
  // eslint-disable-next-line no-unused-vars
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };
  // eslint-disable-next-line no-undef
  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantsView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restoran a');

      expect(presenter.latestQuery).toEqual('restoran a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restoran a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restoran a');
    });

    it('should show the found restaurant', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(1);

      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(2);
    });

    it('should show the title of the found restaurant', () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
      ]);
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');

      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
    });

    it('should show the Restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');

          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should not show any movie', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('restoran a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });

  it('should show all favorite restaurants', () => {
    favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
    searchRestaurants('    ');

    expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', () => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:update', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restoran a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
  });
});
