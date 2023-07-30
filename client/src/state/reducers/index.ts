import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './apiReducer/apiReducer';
import authReducer from './authReducer/authReducer';

const reducers = combineReducers({
  api: apiReducer,
  auth: authReducer,
});

export default reducers;
