import {
  LoginPage,
  SignupPage,
  HomePage,
  ProjectPage,
  SettingsPage,
} from "../pages";
import Redirector from "../pages/project/Redirector";

export const routeConfig = {
  mainPages: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/project",
      component: Redirector,
    },
    {
      path: "/project/:projectId",
      component: ProjectPage,
    },
    {
      path: "/project/:projectId/settings",
      component: SettingsPage,
    },
  ],
  authPages: [
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/signup",
      component: SignupPage,
    },
  ],
};
