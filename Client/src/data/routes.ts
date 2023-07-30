import { Route } from '../interfaces/routes.interface';
import Home from '../pages/Home/Home';

export const routes: Array<Route> = [
  { key: 1, name: 'Overview', path: '/', element: Home },
];
