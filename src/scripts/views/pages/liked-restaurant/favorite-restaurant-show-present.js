class FavoriteRestaurantShowPresent {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurants = this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  async searchRestaurants(query) {
    const restaurants = await this._favoriteRestaurants.searchRestaurants(query);
    this._displayRestaurants(restaurants);
  }
}

export default FavoriteRestaurantShowPresent;
