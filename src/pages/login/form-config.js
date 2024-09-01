import axios from "axios";
import { server_url } from "../../utils/constants";

export const login_form_config = {
  title: "Welcome back!",
  submit_button: "Log In",
  mode: "login",
  inputs: [
    {
      label: "Your Email",
      type: "email",
      key: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      type: "password",
      key: "password",
      placeholder: "Enter password",
    },
  ],
  action: async (userCredentials) => {
    // login action

    return await axios.get(`${server_url}/users`, {
      params: userCredentials,
    });
  },
};
