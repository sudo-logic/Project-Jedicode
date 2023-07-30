import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { routes } from '../data/routes';

const useMatchedRoute = () => {
  const { pathname } = useLocation();
  for (const route of routes) {
    if (matchPath({ path: route.path }, pathname)) {
      return route;
    }
  }
};

export default useMatchedRoute;
