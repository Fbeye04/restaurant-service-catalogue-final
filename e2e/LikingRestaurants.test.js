/* eslint-disable no-undef */
// File: e2e/LikingRestaurants.test.js
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('#restaurant-list');
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '#empty-favorite-message'
  );
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '#empty-favorite-message'
  );
  I.amOnPage('/');

  // Melihat restaurant pertama dan mengklik untuk detail
  I.seeElement('.card a');
  const firstRestaurant = locate('.card-title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  // Melihat tombol like dan mengkliknya
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.card');

  // Memverifikasi data restaurant yang disukai
  const likedRestaurantTitle = await I.grabTextFrom('.card-title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// ... rest of test code remains the same ...
