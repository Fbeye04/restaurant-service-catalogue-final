// File: src/scripts/views/pages/favorite.js
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantCard } from '../../utils/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="restaurant-list" class="card-container">
          
        </div>
        <div id="empty-favorite-message" style="display: none;">
          <p>You haven't added any restaurants to your favorites yet.</p>
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantContainer = document.querySelector('#restaurant-list');
      const emptyMessage = document.querySelector('#empty-favorite-message');

      // Clear existing content
      restaurantContainer.innerHTML = '';

      // Pastikan restaurants adalah array dan memiliki data
      if (!Array.isArray(restaurants) || restaurants.length === 0) {
        emptyMessage.style.display = 'block';
        return;
      }

      // Sembunyikan pesan kosong jika ada data
      emptyMessage.style.display = 'none';

      // Render restaurant cards
      restaurants.forEach((restaurant) => {
        const restaurantCard = createRestaurantCard(restaurant);
        restaurantContainer.appendChild(restaurantCard);
      });
    } catch (error) {
      console.error('Error loading favorite restaurants:', error);
      const restaurantContainer = document.querySelector('#restaurant-list');
      restaurantContainer.innerHTML =
        '<div class="error-message">Failed to load favorite restaurants. Please try again later.</div>';
    }
  },
};

export default Favorite;
