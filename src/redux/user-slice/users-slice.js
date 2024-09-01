// src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from "../../utils/constants";
const initialState = {
  users: [],
};

export const fetchProjectUsers = createAsyncThunk(
  "users/fetchSingleUser",
  async (projectId) => {
    const response = await axios.get(`${server_url}/projects`, {
      params: { id: projectId },
    });
    return response.data[0].users;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(`${server_url}/users`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;
