import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "react-redux-typescript";
import { user } from "./@types.data";
import { RootState } from "./store";

// init state
const initialState = {
  isUser: false,
  username: "",
  password: "",
} as user;

const AuthSlice = createSlice({
  // name used in action types
  name: "auth",
  // initial state
  initialState,
  // an object of "case reducers"
  // key names are used to generate actions
  reducers: {
    createUser: (state: user, action: PayloadAction<string, user>) => {
      state.password = action.payload.password;
      state.username = action.payload.username;
    },
  },
});

export const { createUser } = AuthSlice.actions;
export default AuthSlice.reducer;

// create and export the selector
export const selectAuth = (state: RootState) => state.auth;
