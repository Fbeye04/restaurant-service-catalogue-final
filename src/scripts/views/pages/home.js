// File: src/scripts/views/pages/home.js
import CONFIG from '../../globals/config';
import {
  createRestaurantCard,
  createLoadingTemplate,
} from '../../utils/template-creator';
import ToastInitiator from '../../utils/toast-initiator';

const Home = {
  async render() {
    return `
      <section class="hero" role="banner">
        <img
          src="./images/heros/hero-image_1.jpg"
          alt="RestoMate featured restaurants banner"
          class="hero-image"
        />
      </section>

      <section class="restaurant-list">
        <h2>Explore Restaurant</h2>
        <div id="restaurant-list" class="card-container">
          ${createLoadingTemplate()}
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list');
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/list`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();

      restaurantList.innerHTML = '';

      if (data.restaurants.length === 0) {
        ToastInitiator.show('No restaurants found', 'info');
        return;
      }

      data.restaurants.forEach((restaurant) => {
        const card = createRestaurantCard(restaurant);
        restaurantList.appendChild(card);
      });
    } catch (error) {
      console.error('Error:', error);
      restaurantList.innerHTML = '';
      ToastInitiator.show(
        'Failed to load restaurants. Please check your connection and try again.',
        'error'
      );
    }
  },
};

export default Home;
