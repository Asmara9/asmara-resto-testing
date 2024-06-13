/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/like');
});

// eslint-disable-next-line no-undef
Scenario('test something', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item_not_found');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.seeElement('.query');

  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
    I.amOnPage('/');

    I.seeElement('.restaurant__title a');
    const firstRestaurant = locate('.movie__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.restaurant-item');
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  });

  Scenario('searching restaurants', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

    I.amOnPage('/');

    I.seeElement('.restaurant__title a');

    const titles = [];
    for (let i = 1; i <= 3; i++) {
      I.click(locate('.restaurant__title a').at(i));
      I.seeElement('#likeButton');
      I.click('#likeButton');
      // eslint-disable-next-line no-await-in-loop
      titles.push(await I.grabTextFrom('.restaurant__title'));
      I.amOnPage('/');
    }

    I.amOnPage('/#/like');
    I.seeElement('#query');

    const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
    assert.strictEqual(titles.length, visibleLikedRestaurants);

    const searchQuery = titles[1].substring(1, 3);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');
    // mendapatkan daftar film yang sesuai dengan searchQuery
    const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);
    const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
    assert.strictEqual(matchingRestaurant.length, visibleSearchedLikedRestaurants);
    for (let i = 0; i < matchingRestaurant.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(i + 1));
      assert.strictEqual(matchingRestaurant[i], visibleTitle);
    }
  });
});
