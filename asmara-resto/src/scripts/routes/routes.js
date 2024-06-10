import NowResto from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': NowResto,
  '/home': NowResto,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
