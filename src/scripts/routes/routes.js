/* eslint-disable no-unused-vars */
import ListRestaurant from '../views/pages/list-restaurant';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': ListRestaurant,
  '/home': ListRestaurant,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
