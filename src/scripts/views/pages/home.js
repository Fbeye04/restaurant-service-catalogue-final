// File: src/scripts/views/pages/home.js
import CONFIG from '../../globals/config';
import {
  createRestaurantCard,
  createSkeletonRestaurantTemplate,
} from '../../utils/template-creator';

const Home = {
  async render() {
    return `
      <section class="hero" role="banner">
        <picture>
          <source media="(max-width: 600px)" srcset="./images/heros/hero-image_1-small.jpg">
          <source media="(min-width: 601px)" srcset="./images/heros/hero-image_1-large.jpg">
          <img 
            src="./images/heros/hero-image_1-large.jpg"
            alt="RestoMate featured restaurants banner"
            class="hero-image"
            loading="lazy"
          >
        </picture>
      </section>

      <section class="restaurant-list">
        <h2>Explore Restaurant</h2>
        <div id="restaurant-list" class="card-container">
          ${createSkeletonRestaurantTemplate(6)}
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list');

    try {
      const response = await fetch(`${CONFIG.BASE_URL}/list`);
      const responseJson = await response.json();

      if (response.ok) {
        restaurantList.innerHTML = '';
        responseJson.restaurants.forEach((restaurant) => {
          const restaurantCard = createRestaurantCard(restaurant);
          restaurantList.appendChild(restaurantCard);
        });
      } else {
        throw new Error('Failed to fetch restaurants');
      }
    } catch (error) {
      console.error('Error:', error);
      restaurantList.innerHTML =
        '<div class="error-message">Failed to load restaurants. Please try again later.</div>';
    }
  },
};

export default Home;
