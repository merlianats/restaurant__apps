import UrlParser from '../../routes/url-parser';
import TheRestaurantsDbSource from '../../data/therestaurantsdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantSource from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <hr>
      <div id="detail-resto" class="detail-resto"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantsDbSource.detailRestaurant(url.id);
    const detailMenuContainer = document.querySelector('#detail-resto');
    detailMenuContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantSource,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        rating: restaurant.rating,
        pictureId: restaurant.pictureId,
      },
    });
  },

};

export default Detail;
