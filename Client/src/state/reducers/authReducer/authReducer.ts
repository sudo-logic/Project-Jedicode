import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

type authState = {
  user: {
    id: string;
    username: string;
    designation: string;
    role: string;
    department: string;
    email: string;
  };
  loggedIn: boolean;
};

const user: any =
  localStorage.getItem('refreshToken') !== null
    ? jwt_decode(localStorage.getItem('refreshToken') as string)
    : ({} as any);

const initialState = {
  user:
    localStorage.getItem('refreshToken') !== null
      ? jwt_decode(localStorage.getItem('refreshToken') as string)
      : ({} as any),
  loggedIn:
    localStorage.getItem('refreshToken') !== null
      ? user.exp - Date.now() / 1000 > 0
      : false,
} as authState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: authState, action: PayloadAction<any>) => {
      if (localStorage.getItem('accessToken') !== null) {
        state.loggedIn = true;
      }
    },
    logout: (state: authState, action: PayloadAction<any>) => {
      state.loggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setUser: (state: authState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
