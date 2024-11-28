// File: src/scripts/views/pages/favorite.js
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantCard } from '../../utils/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="search-container">
          <input 
            id="query" 
            type="text" 
            placeholder="Search favorite restaurants..."
          >
        </div>
        <div id="restaurant-list" class="card-container">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list');
    const searchElement = document.getElementById('query');

    const renderResults = (restaurants) => {
      restaurantList.innerHTML = '';
      if (restaurants.length === 0) {
        // Mengubah pesan sesuai dengan ekspektasi test
        const emptyMessage = searchElement.value
          ? '<div id="empty-favorite-message">No restaurants found matching your search</div>'
          : '<div id="empty-favorite-message">You haven\'t added any restaurants to your favorites yet</div>';
        restaurantList.innerHTML = emptyMessage;
        return;
      }
      restaurants.forEach((restaurant) => {
        const card = createRestaurantCard(restaurant);
        restaurantList.appendChild(card);
      });
    };

    // Initial render
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    renderResults(restaurants);

    // Handle search
    searchElement.addEventListener('input', async (event) => {
      const query = event.target.value;
      const results = await FavoriteRestaurantIdb.searchRestaurants(query);
      renderResults(results);
    });
  },
};

export default Favorite;
