import axios from "axios";
import { server_url } from "../../utils/constants";

export const signup_form_config = {
  title: "Seconds to sign up!",
  submit_button: "Sign up",
  mode: "signup",
  inputs: [
    {
      label: "Full Name",
      type: "text",
      key: "full_name",
      placeholder: "John Doe",
    },
    {
      label: "Your Email",
      type: "email",
      key: "email",
      placeholder: "example@site.com",
    },
    {
      label: "Password",
      type: "password",
      key: "password",
      placeholder: "Minimum 6 characters",
    },
  ],
  action: async (userCredentials) => {
    // sign up action
    const existingUser = await axios.get(`${server_url}/users`, {
      params: { email: userCredentials.email },
    });

    if (existingUser.data.length > 0) {
      return new Promise((_, reject) => {
        reject("User already exists!");
      });
    }

    return await axios.post(`${server_url}/users`, userCredentials);
  },
};
