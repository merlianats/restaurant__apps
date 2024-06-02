import TheRestaurantsDbSource from '../../data/therestaurantsdb-source';
import { createRestaurantItemTemplate, loadingIndicator } from '../templates/template-creator';

const ListRestaurants = {
  async render() {
    return `
      <section class="hero-main">
        <picture>
          <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
          <img src="./images/heros/hero-image_4-large.jpg" alt="One of the most delicious food" />
        </picture>
      </section>
      <div id="restaurants" class="resto-list"></div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await TheRestaurantsDbSource.listRestaurants();
      this.renderResto(restaurants);
    } catch (error) {
      this.renderError(error);
    }
  },

  renderLoadingIndicator() {
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = loadingIndicator();
  },

  renderResto(restaurants) {
    const restaurantContainer = document.querySelector('#restaurants');
    restaurantContainer.innerHTML = '';

    restaurants.forEach((restaurant) => {
      const restaurantItem = this.restaurantItem(restaurant);
      restaurantContainer.appendChild(restaurantItem);
    });
  },

  renderError(message) {
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = `<p>${message}</p>`;
  },

  restaurantItem(restaurant) {
    const restaurantItem = document.createElement('div');
    restaurantItem.innerHTML = createRestaurantItemTemplate(restaurant);

    return restaurantItem;
  },

};

export default ListRestaurants;
