import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './state';
import axios from 'axios';
import { BASE_URL } from './env';

const root = ReactDOM.createRoot(document.getElementById('root')!);

axios.interceptors.request.use(
  (config: any) => {
    if (
      config.url.substr(config.url.lastIndexOf('/'), config.url.length) ==
      '/refresh'
    ) {
      config.headers['x-tenant-id'] = localStorage.getItem('x-tenant-id');
      return config;
    }
    // if () {
    //   return config;
    // }
    let token =
      localStorage.getItem('accessToken') !== null
        ? localStorage.getItem('accessToken')
        : '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-tenant-id'] = localStorage.getItem('x-tenant-id');
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .request({
          method: 'get',
          url: `${BASE_URL}/auth/refresh`,
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log('Access token refreshed!');
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
