// File: src/scripts/views/pages/detail.js
import UrlParser from '../../routes/url-parser';
import CONFIG from '../../globals/config';
import {
  createRestaurantDetailTemplate,
  createLoadingTemplate,
} from '../../utils/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import ReviewInitiator from '../../utils/review-initiator';
import ToastInitiator from '../../utils/toast-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant-detail" class="restaurant-detail">
        ${createLoadingTemplate()}
      </div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.getElementById('restaurant-detail');

    try {
      const response = await fetch(`${CONFIG.BASE_URL}/detail/${url.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant details');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Failed to load restaurant details');
      }

      restaurantContainer.innerHTML = createRestaurantDetailTemplate(
        data.restaurant
      );

      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: data.restaurant.id,
          name: data.restaurant.name,
          description: data.restaurant.description,
          pictureId: data.restaurant.pictureId,
          rating: data.restaurant.rating,
          city: data.restaurant.city,
        },
      });

      ReviewInitiator.init({
        formContainer: document.querySelector('#reviewFormContainer'),
        restaurantId: data.restaurant.id,
      });
    } catch (error) {
      console.error('Error:', error);
      restaurantContainer.innerHTML = '';
      ToastInitiator.show(
        error.message || 'Failed to load restaurant details. Please try again.',
        'error'
      );
    }
  },
};

export default Detail;
