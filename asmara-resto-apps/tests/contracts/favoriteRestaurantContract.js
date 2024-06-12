/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  // eslint-disable-next-line no-undef
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putRestaurants({ id: 1 });
    favoriteRestaurant.putRestaurants({ id: 2 });

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getRestaurants(1)).toEqual({ id: 1 });
    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getRestaurants(2)).toEqual({ id: 2 });
    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getRestaurants(3)).toEqual(undefined);
  });

  // eslint-disable-next-line no-undef
  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putRestaurants({ aProperty: 'property' });

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  // eslint-disable-next-line no-undef
  it('can return all of the resntaurants that have been added', async () => {
    favoriteRestaurant.putRestaurants({ id: 1 });
    favoriteRestaurant.putRestaurants({ id: 2 });

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  // eslint-disable-next-line no-undef
  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putRestaurants({ id: 1 });
    favoriteRestaurant.putRestaurants({ id: 2 });
    favoriteRestaurant.putRestaurants({ id: 3 });

    await favoriteRestaurant.deleteRestaurants(1);

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  // eslint-disable-next-line no-undef
  it('should handle request to remove a restaurant even though the movie has not been added', async () => {
    favoriteRestaurant.putRestaurants({ id: 1 });
    favoriteRestaurant.putRestaurants({ id: 2 });
    favoriteRestaurant.putRestaurants({ id: 3 });

    await favoriteRestaurant.deleteRestaurants(4);

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteRestaurant.putRestaurants({ id: 1, title: 'restaurant a' });
    favoriteRestaurant.putRestaurants({ id: 2, title: 'restaurant b' });
    favoriteRestaurant.putRestaurants({ id: 3, title: 'restaurant abc' });
    favoriteRestaurant.putRestaurants({ id: 4, title: 'ini mah restaurant abcd' });

    // eslint-disable-next-line no-undef
    expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 3, title: 'restaurant abc' },
      { id: 4, title: 'ini mah restaurant abcd' },
    ]);
  });
};
// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
