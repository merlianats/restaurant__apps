import FavoriteRestaurantSource from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchPresent from './liked-restaurant/favorite-restaurant-search-present';
import FavoriteRestaurantShowPresent from './liked-restaurant/favorite-restaurant-show-present';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return `
      <hr>
      <br>
      <div class="favorite_content">
        <h4>Favorite Restaurant</h4>
        <div id="restaurants" class="resto-list-favorite"></div>
      </div>
    `;
    // return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresent({ view, favoriteRestaurants: FavoriteRestaurantSource });
    new FavoriteRestaurantSearchPresent({ view, favoriteRestaurants: FavoriteRestaurantSource });
  },
};

export default Favorite;
