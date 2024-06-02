/* eslint-disable no-use-before-define */
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="restaurant-item>
      <h2 class="restaurant__title" id="restaurant__title">${restaurant.name}</h2>
      <img class="restaurant__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant__info">
          <h3>Information</h3>
          <div class="restaurant__city">
              <h4>City</h4>
              <p>${restaurant.city}</p>
          </div>
          <div class="restaurant__address">
              <h4>Address</h4>
              <p>${restaurant.address}</p>
          </div>
          <div class="restaurant__rating">
              <h4>Rating</h4>
              <p>${restaurant.rating}</p>
          </div>
          <div class="restaurant__description">
              <h4>Description</h4>
              <p>${restaurant.description}</p>
          </div>
      </div>
      <div class="restaurant__menu">
          <h4>Restaurant Menus</h4>
          <hr>
          <div class="layout__menus">
              <div class="food__menus">
                  <h5>Foods</h5>
                  <ul>
                      ${restaurant.menus.foods.map((food) => `<li class="list-menu-resto">${food.name}</li>`).join('')}
                  </ul>
              </div>
              <div class="drink__menus">
                  <h5>Drinks</h5>
                  <ul>
                      ${restaurant.menus.drinks.map((drink) => `<li class="list-menu-resto">${drink.name}</li>`).join('')}
                  </ul>
              </div>
          </div>
      </div>
    </div>
    <div class="restaurant__reviews">
        <h3>Reviews</h3>
        <hr>
        <ul>
        ${restaurant.customerReviews.map((review) => `
          <li class="reviews">
            <div class="reviews_header">
              <p class="reviews_name">${review.name}</p>
              <p class="reviews_date">${review.date}</p>
            </div>
            <p class="reviews_des">${review.review}</p>
          </li>
        `).join('')}
      </ul>
    </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item card-resto">
      <img class="img-resto lazyload" data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}">
      <div class="info-resto">
        <p class="restaurant__name" ><a href="/#/detail/${restaurant.id}" class="go-detail restaurant__title">${restaurant.name || '-'} <span class="resto-city">${restaurant.city}</span></a></p>
        <div class="description-resto">
          <p>${`${restaurant.description ? restaurant.description.slice(0, 100) : ''}...`}</p>
        </div>
        <div class="rating-resto">
          <p>⭐️<span>${restaurant.rating}</span></p>
        </div>
      </div>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const loadingIndicator = () => `
  <div class="loading">
    <svg class="loading-icon" viewBox="0 0 50 50">
      <circle class="path" cx="26" cy="26" r="21" fill="#db0000" stroke-width="5">
      </circle>
    </svg>
    <p>Loading Data</p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createLikedRestaurantButtonTemplate,
  loadingIndicator,
};
