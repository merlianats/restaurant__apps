/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  // getTemplate() {
  //   return `
  //     <hr>
  //     <br>
  //     <div class="favorite_content">
  //       <input id="query" type="text">
  //       <h2 class="content__heading">Favorite Restaurants</h2>

  //       <div id="restaurants" class="restaurants resto-list-favorite"></div>
  //       </div>
  //     </div>
  //   `;
  // }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
