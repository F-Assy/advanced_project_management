// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const value = window.localStorage.getItem("userSession")
  ? JSON.parse(window.localStorage.getItem("userSession"))
  : null;

const initialState = {
  userInfo: value,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      window.localStorage.setItem(
        "userSession",
        JSON.stringify(action.payload)
      );
    },
    logout: (state) => {
      state.userInfo = null;
      window.localStorage.removeItem("userSession");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
