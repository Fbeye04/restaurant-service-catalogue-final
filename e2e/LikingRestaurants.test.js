/* eslint-disable no-undef */
// File: e2e/LikingRestaurants.test.js
const assert = require('assert');

Feature('Liking Restaurants');

// Menambahkan variabel global untuk menyimpan judul restaurant
let firstRestaurantTitle = '';

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
  firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
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

// Menambahkan skenario unlike restaurant
Scenario('unliking one restaurant', async ({ I }) => {
  // Like restaurant terlebih dahulu
  I.amOnPage('/');
  I.seeElement('.card a');
  const firstRestaurant = locate('.card-title').first();
  firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.card');

  // Klik restaurant yang disukai
  I.click('.card-title');

  // Unlike restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Kembali ke halaman favorite
  I.amOnPage('/#/favorite');

  // Verifikasi restaurant sudah tidak ada di favorite
  I.see(
    "You haven't added any restaurants to your favorites yet",
    '#empty-favorite-message'
  );
});
