import { Middleware } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { messages } from '../../data/messages';
import { BASE_URL } from '../../env';

interface MiddlewareProps {
  type: string;
  payload: {
    baseURL: string;
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
    data: any;
    onSuccess: string;
    onError: string;
    showLoader: boolean;
  };
}

const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action: MiddlewareProps) => {
    if (action.type !== 'api/apiRequestBegan') return next(action);

    next(action);

    const {
      baseURL = BASE_URL,
      url,
      method,
      data,
      onSuccess,
      onError,
      showLoader = true,
    } = action.payload;

    try {
      if (showLoader) {
        message.loading({
          content: messages[onSuccess].loading_message,
          duration: 0,
          key: 'loading_msg',
        });
      }

      const response = await axios.request({
        baseURL,
        url,
        method,
        data,
      });

      if (showLoader) {
        message.destroy('loading_msg');
      }
      showLoader &&
        dispatch({
          type: 'api/apiRequestSuccess',
          payload:
            messages[onSuccess] != undefined
              ? messages[onSuccess].completed_message
              : 'Request Successful!!',
        });

      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error: any) {
      dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
