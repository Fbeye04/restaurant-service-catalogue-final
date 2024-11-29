/* eslint-disable indent */
// File: src/scripts/utils/template-creator.js
import CONFIG from '../globals/config';

// File: src/scripts/utils/template-creator.js

const createRestaurantCard = (restaurant) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'listitem');
  card.setAttribute(
    'aria-label',
    `${restaurant.name} restaurant in ${restaurant.city}`
  );

  const restaurantLink = document.createElement('a');
  restaurantLink.href = `/#/detail/${restaurant.id}`;
  restaurantLink.style.textDecoration = 'none';
  restaurantLink.style.color = 'inherit';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'card-image';

  const image = document.createElement('img');
  image.src = ''; // Hapus src
  image.dataset.src = `${CONFIG.BASE_URL}/images/small/${restaurant.pictureId}`; // Gunakan data-src
  image.alt = `Restaurant ${restaurant.name} in ${restaurant.city}`;
  image.className = 'restaurant-image lazyload'; // Tambahkan class lazyload

  const city = document.createElement('span');
  city.className = 'city';
  city.setAttribute('aria-label', `Located in ${restaurant.city}`);
  city.textContent = restaurant.city;

  imageContainer.appendChild(image);
  imageContainer.appendChild(city);

  const content = document.createElement('div');
  content.className = 'card-content';

  const rating = document.createElement('div');
  rating.className = 'card-rating';
  rating.setAttribute('aria-label', `Rating: ${restaurant.rating} out of 5`);
  rating.textContent = `★ ${restaurant.rating}`;

  const name = document.createElement('h3');
  name.className = 'card-title';
  name.textContent = restaurant.name;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = `${restaurant.description.substring(0, 100)}...`;

  // Menambahkan tombol CTA
  const detailButton = document.createElement('button');
  detailButton.className = 'card-detail-button';
  detailButton.textContent = 'See Details';
  detailButton.setAttribute('aria-label', `See details of ${restaurant.name}`);
  detailButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `/#/detail/${restaurant.id}`;
  });

  content.appendChild(rating);
  content.appendChild(name);
  content.appendChild(description);
  content.appendChild(detailButton);

  restaurantLink.appendChild(imageContainer);
  restaurantLink.appendChild(content);
  card.appendChild(restaurantLink);

  return card;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail">
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <img class="restaurant__poster lazyload" 
         data-src="${CONFIG.BASE_URL}/images/medium/${restaurant.pictureId}" 
         alt="${restaurant.name}" />
    <div class="restaurant__info">
      <div class="restaurant__info-header">
        <h3>Information</h3>
        <div id="likeButtonContainer"></div>
      </div>
      <h4>Address</h4>
      <p>${restaurant.address}, ${restaurant.city}</p>
      <h4>Rating</h4>
      <p>${restaurant.rating}</p>
      <h4>Categories</h4>
      <p>${restaurant.categories.map((category) => category.name).join(', ')}</p>
      <h4>Description</h4>
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant__menu">
      <h3>Menu</h3>
      <div class="foods">
        <h4>Foods</h4>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
      </div>
      <div class="drinks">
        <h4>Drinks</h4>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="restaurant__reviews">
      <h3>Customer Reviews</h3>
      <div class="reviews-list">
        ${restaurant.customerReviews
          .map(
            (review) => `
          <div class="review-item">
            <div class="review-header">
              <p class="review-name">${review.name}</p>
              <p class="review-date">${review.date}</p>
            </div>
            <p class="review-text">${review.review}</p>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </div>
`;

const createReviewFormTemplate = () => `
  <div class="review-form">
    <h4>Add Your Review</h4>
    <form id="reviewForm">
      <div class="form-group">
        <label for="reviewerName">Name</label>
        <input 
          type="text" 
          id="reviewerName" 
          name="name" 
          required 
          placeholder="Enter your name"
        >
      </div>
      <div class="form-group">
        <label for="reviewText">Review</label>
        <textarea 
          id="reviewText" 
          name="review" 
          required 
          minlength="20" 
          maxlength="300" 
          placeholder="Share your experience (20-300 characters)"
        ></textarea>
        <small class="character-count">0/300 characters</small>
      </div>
      <button type="submit" class="submit-review">Submit Review</button>
    </form>
    <div id="reviewMessage" class="review-message"></div>
  </div>
`;

const createLoadingTemplate = () => `
  <div class="loader-container">
    <div class="loader"></div>
  </div>
`;

const createButtonLoadingTemplate = () => `
  <span class="button-loader"></span>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let template = '';
  for (let i = 0; i < count; i += 1) {
    template += `
      <article class="card is-loading">
        <div class="card-image skeleton"></div>
        <div class="card-content">
          <div class="card-rating skeleton"></div>
          <h3 class="card-title skeleton"></h3>
          <p class="card-description skeleton"></p>
        </div>
      </article>
    `;
  }
  return template;
};

const createSkeletonDetailTemplate = () => `
  <div class="detail is-loading">
    <h2 class="restaurant__name skeleton"></h2>
    <div class="restaurant__poster skeleton"></div>
    <div class="restaurant__info">
      <h3 class="skeleton"></h3>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
    <div class="restaurant__menu">
      <h3 class="skeleton"></h3>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
  </div>
`;

export {
  createRestaurantCard,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createLikedRestaurantButtonTemplate,
  createReviewFormTemplate,
  createLoadingTemplate,
  createButtonLoadingTemplate,
  createSkeletonRestaurantTemplate,
  createSkeletonDetailTemplate,
};
