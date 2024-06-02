import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantsDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

console.log(TheRestaurantsDbSource.listRestaurants());
export default TheRestaurantsDbSource;
