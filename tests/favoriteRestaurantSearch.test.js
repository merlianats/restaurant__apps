/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresent from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-present';
import FavoriteRestaurantSource from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';

class FavoriteMovieSearchView {
  getTemplate() {
    return `
      <div id="restaurant-search-container">
        <input id="query" type="text">
 
        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`
          <li class="restaurant">
            <span class="restaurant__title">${restaurant.title || '-'}</span>
          </li>
        `),
        '',
      );
    } else {
      html = '<div class="restaurants__not__found">Restaurant tidak ditemukan</div>';
    }
    document.querySelector('.restaurants').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }
}

describe('Searching restaurants', () => {
  let present;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresent = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    present = new FavoriteRestaurantSearchPresent({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresent();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(present.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', () => {
      present._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurants').length).toEqual(1);
      present._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      present._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
      ]);
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');

      present._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      present._showFoundRestaurants([{ id: 1 }]);

      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');

          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(present.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(present.latestQuery.length).toEqual(0);
      searchRestaurants('');
      expect(present.latestQuery.length).toEqual(0);
      searchRestaurants('\t');
      expect(present.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
  });
});
