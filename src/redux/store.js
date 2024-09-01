// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice/user-session-slice";
import usersReducer from "./user-slice/users-slice";
import projectsReducer from "./projects-slice/projects-slice";
import tasksReducer from "./projects-slice/tasks-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});

export default store;
