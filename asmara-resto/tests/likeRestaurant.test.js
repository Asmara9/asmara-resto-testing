import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb';

// eslint-disable-next-line no-undef
describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    addLikeButtonContainer();
  });

  // eslint-disable-next-line no-undef
  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not show the unlike button when the movie has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it('should be able to like the restaurant', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurants(1);
    // eslint-disable-next-line no-undef
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurants(1);
  });

  // eslint-disable-next-line no-undef
  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    await FavoriteRestaurantIdb.putRestaurants({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurants(1);
  });

  // eslint-disable-next-line no-undef
  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});