import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'react-redux-typescript';
import { user } from './@types.data';
import { RootState } from './store';

// init state
const initialState = {
  isUser: false,
  username: '',
  isLoading: false,
} as user;

const AuthSlice = createSlice({
  // name used in action types
  name: 'auth',
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    createUser: (state: user, action: PayloadAction<string, user>) => {
      state.username = action.payload.username;
      state.isUser = true;
    },
    setIsloading: (state: user, action: PayloadAction<string, boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { createUser, setIsloading } = AuthSlice.actions;
export default AuthSlice.reducer;

// create and export the selector
export const selectAuth = (state: RootState) => state.auth;
