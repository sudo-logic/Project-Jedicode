import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IMessage } from '../../../data/messages';

const apiSlice = createSlice({
  name: 'api',
  initialState: 'api',
  reducers: {
    apiRequestSuccess: (state, action: PayloadAction<string>) => {
      message.success(action.payload);
    },
    apiRequestFailed: (state, action: PayloadAction<string>) => {
      message.error(action.payload);
    },
  },
});

export const { apiRequestSuccess, apiRequestFailed } = apiSlice.actions;
export default apiSlice.reducer;
