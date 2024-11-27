/* eslint-disable no-undef */
// File: e2e/LikingRestaurants.test.js
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('#restaurant-list');
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '.empty-favorite-message'
  );
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '.empty-favorite-message'
  );
  I.amOnPage('/');

  // Melihat restaurant pertama dan mengklik untuk detail
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  // Melihat tombol like dan mengkliknya
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Memverifikasi data restaurant yang disukai
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '.empty-favorite-message'
  );

  // Like restaurant dulu
  I.amOnPage('/');
  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Klik restaurant yang disukai
  I.click('.restaurant__title a');

  // Unlike restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Kembali ke halaman favorite
  I.amOnPage('/#/favorite');
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '.empty-favorite-message'
  );
  I.dontSeeElement('.restaurant-item');
});
