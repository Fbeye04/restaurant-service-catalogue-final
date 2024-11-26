// File: src/scripts/utils/review-initiator.js
import CONFIG from '../globals/config';
import { createReviewFormTemplate } from './template-creator';

const ReviewInitiator = {
  init({ formContainer, restaurantId }) {
    this._formContainer = formContainer;
    this._restaurantId = restaurantId;

    this._renderForm();
    this._initializeListeners();
  },

  _renderForm() {
    this._formContainer.innerHTML = createReviewFormTemplate();
    this._form = this._formContainer.querySelector('#reviewForm');
    this._reviewText = this._formContainer.querySelector('#reviewText');
    this._characterCount =
      this._formContainer.querySelector('.character-count');
    this._messageContainer =
      this._formContainer.querySelector('#reviewMessage');
  },

  _initializeListeners() {
    this._reviewText.addEventListener('input', (event) => {
      const length = event.target.value.length;
      this._characterCount.textContent = `${length}/300 characters`;
    });

    this._form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this._handleSubmit();
    });
  },

  async _handleSubmit() {
    try {
      const formData = new FormData(this._form);
      const review = {
        id: this._restaurantId,
        name: formData.get('name'),
        review: formData.get('review'),
      };

      const response = await fetch(`${CONFIG.BASE_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        this._showMessage(
          'Failed to submit review. Please try again.',
          'error'
        );
        return;
      }

      this._showMessage('Thank you! Your review has been added.', 'success');
      this._form.reset();
      this._characterCount.textContent = '0/300 characters';

      // Update review list
      const reviewList = document.querySelector('.reviews-list');
      const newReview =
        responseJson.customerReviews[responseJson.customerReviews.length - 1];
      const reviewElement = this._createReviewElement(newReview);
      reviewList.insertBefore(reviewElement, reviewList.firstChild);
    } catch (error) {
      console.error('Error:', error);
      this._showMessage('Failed to submit review. Please try again.', 'error');
    }
  },

  _showMessage(message, type) {
    this._messageContainer.textContent = message;
    this._messageContainer.className = `review-message ${type}`;
    setTimeout(() => {
      this._messageContainer.className = 'review-message';
    }, 3000);
  },

  _createReviewElement(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
      <div class="review-header">
        <p class="review-name">${review.name}</p>
        <p class="review-date">${review.date}</p>
      </div>
      <p class="review-text">${review.review}</p>
    `;
    return reviewItem;
  },
};

export default ReviewInitiator;
