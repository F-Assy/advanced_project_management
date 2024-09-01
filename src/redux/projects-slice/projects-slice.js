// src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from "../../utils/constants";

const initialState = {
  projects: [],
  selectedProject: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUserProjects = createAsyncThunk(
  "projects/fetchUserProjects",

  async (userId) => {
    // all projects in the db
    const response = await axios.get(`${server_url}/projects`);

    //return filtered projects
    return response.data.filter((project) =>
      project.users.some((user) => user.id === userId)
    );
  }
);

export const fetchSingleProject = createAsyncThunk(
  "projects/fetchSingleProject",
  async ({ projectId, userId }) => {
    // get project data
    const projectResponse = await axios.get(
      `${server_url}/projects/${projectId}`
    );

    // get user role in project
    const relationships = await axios.get(`${server_url}/projectUsers`, {
      params: { userId },
    });
    if (!relationships.data[0] || !projectResponse.data) return null;
    const role = relationships.data.filter(
      (rlt) => rlt.projectId === projectId
    );
    // get user role in project

    return { ...projectResponse.data, role: role[0].role };
  }
);
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    const ownerId = projectData.ownerId;

    const response = await axios.get(`${server_url}/users`, {
      params: { id: ownerId },
    });
    const owner = response.data[0];
    delete owner.password;

    projectData.users = [{ ...owner, role: "owner" }];

    const result = await axios.post(`${server_url}/projects`, projectData);

    await axios.post(`${server_url}/projectUsers`, {
      projectId: result.data.id,
      userId: owner.id,
      role: "owner",
    });

    return result.data;
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id) => {
    const relationshipsResponse = await axios.get(
      `${server_url}/projectUsers`,
      { params: { projectId: id } }
    );
    const relationships = relationshipsResponse.data;
    const deletePromises = relationships.map((relationship) =>
      axios.delete(`${server_url}/projectUsers/${relationship.id}`)
    );
    await Promise.all(deletePromises);

    const result = await axios
      .delete(`${server_url}/projects/${id}`)
      .catch((error) => console.error(error));
    return result.data;
  }
);

export const updateUserProjectRole = createAsyncThunk(
  "projects/updateUserRole",
  async ({ projectId, userId, role, currRole }) => {
    try {
      const projectResponse = await axios.get(
        `${server_url}/projects/${projectId}`
      );
      const projectData = projectResponse.data;

      projectData.users = projectData.users.map((user) => {
        if (user.id === userId) return { ...user, role: role };
        else return user;
      });

      const updateProjectResponse = await axios.put(
        `${server_url}/projects/${projectId}`,
        projectData
      );
      const relationsResponse = await axios.get(
        `${server_url}/projectUsers?projectId=${projectId}`
      );
      const relationObj = relationsResponse.data.find(
        (relation) => relation.userId === userId
      );
      if (relationObj) {
        await axios.patch(`${server_url}/projectUsers/${relationObj.id}`, {
          role,
        });
      }
      return { ...updateProjectResponse.data, role: currRole };
    } catch (error) {
      console.error(error);
    }
  }
);
export const addUserToProject = createAsyncThunk(
  "projects/addUserToProject",
  async ({ projectId, currRole, user }) => {
    const response = await axios.get(`${server_url}/projects/${projectId}`);
    const project = response.data;

    const userResponse = await axios.get(`${server_url}/users`, {
      params: { email: user.email },
    });
    const userToInsert = { ...userResponse.data[0], role: user.membership };
    delete userToInsert.password;

    const alreadyExists = project.users.find(
      (user) => user.id === userToInsert.id
    );
    if (alreadyExists) return project;

    const updatedUsers = [...project.users, userToInsert];

    const updatedProject = {
      ...project,
      users: updatedUsers,
    };

    await axios.put(`${server_url}/projects/${projectId}`, updatedProject);
    await axios.post(`${server_url}/projectUsers`, {
      projectId: projectId,
      userId: userToInsert.id,
      role: userToInsert.role,
    });

    return { ...updatedProject, role: currRole };
  }
);
export const selectProject = createAsyncThunk(
  "projects/selectProject",
  async ({ project, userId }) => {
    const response = await axios.get(`${server_url}/projectUsers`, {
      params: { userId },
    });
    const [userRole] = response.data.filter(
      (rlt) => rlt.projectId === project.id
    );
    return { ...project, role: userRole.role };
  }
);
export const deleteUserFromProject = createAsyncThunk(
  "projects/deleteUserFromProject",
  async ({ projectId, userId, role }) => {
    const response = await axios.get(`${server_url}/projects/${projectId}`);
    const project = response.data;

    const updatedUsers = project.users.filter((user) => user.id !== userId);

    const updatedProject = {
      ...project,
      users: updatedUsers,
      role,
    };

    //update project
    await axios.put(`${server_url}/projects/${projectId}`, updatedProject);

    //clear relationship
    const relationshipToDelete = await axios.get(`${server_url}/projectUsers`, {
      params: { projectId },
    });
    await axios.delete(
      `${server_url}/projectUsers/${
        relationshipToDelete.data.find((data) => data.userId === userId).id
      }`
    );
    return updatedProject;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchSingleProject.pending, (state, action) => {
        state.status = "loading";
        state.selectedProject = action.payload;
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProject = action.payload;
      })
      .addCase(addProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(updateUserProjectRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProject = action.payload;
      })
      .addCase(addUserToProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        state.projects = state.projects.map((item) =>
          item.id === newData.id ? { ...item, ...newData } : item
        );
        state.selectedProject = action.payload;
      })
      .addCase(deleteUserFromProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        state.projects = state.projects.map((item) =>
          item.id === newData.id ? { ...item, ...newData } : item
        );
        state.selectedProject = action.payload;
      })
      .addCase(selectProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProject = action.payload;
      });
  },
});
export const { resetState } = projectsSlice.actions;
export default projectsSlice.reducer;
