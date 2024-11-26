/* eslint-disable no-undef */
// File: e2e/LikingRestaurants.test.js
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see("You don't have any favorite restaurant yet", '.error-message');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see("You don't have any favorite restaurant yet", '.error-message');
  I.amOnPage('/');

  // Melihat card restoran pertama
  I.seeElement('.card');
  const firstRestaurant = locate('.card-title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  // Like the restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go to favorite page & verify
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const likedRestaurantTitle = await I.grabTextFrom('.card-title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see("You don't have any favorite restaurant yet", '.error-message');

  // Like a restaurant first
  I.amOnPage('/');
  I.seeElement('.card');
  I.click(locate('.card-title').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go to favorite page
  I.amOnPage('/#/favorite');
  I.seeElement('.card');

  // Click the restaurant to unlike
  I.click(locate('.card-title').first());

  // Unlike the restaurant
  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('#likeButton');

  // Back to favorite page & verify
  I.amOnPage('/#/favorite');
  I.see("You don't have any favorite restaurant yet", '.error-message');
});
