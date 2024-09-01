import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from "../../utils/constants";
const initialState = {
  tasks: [],
};
export const addTask = createAsyncThunk("tasks/addTask", async (data) => {
  const result = await axios
    .post(`${server_url}/tasks`, data)
    .catch((error) => console.error(error));
  return result.data;
});
export const editTask = createAsyncThunk("task/editTask", async (newData) => {
  const result = await axios
    .patch(`${server_url}/tasks/${newData.id}`, newData)
    .catch((error) => console.error(error));
  return result.data;
});
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const result = await axios
    .delete(`${server_url}/tasks/${id}`)
    .catch((error) => console.error(error));
  return result.data;
});
export const fetchProjectTasks = createAsyncThunk(
  "tasks/fetchProjectTasks",
  async (projectId) => {
    const response = await axios.get(`${server_url}/tasks`, {
      params: { projectId },
    });

    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        state.tasks = state.tasks.map((item) =>
          item.id === newData.id ? { ...item, ...newData } : item
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deleted = action.payload;
        state.tasks = state.tasks.filter((item) => item.id !== deleted.id);
      });
  },
});

export const { login, logout } = tasksSlice.actions;

export default tasksSlice.reducer;
