import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { login_form_config } from "./form-config";

import "../../main-css/login-styles.css";

const LoginPage = () => {
  useAuthRedirect("login");
  return (
    <div className="auth-page">
      <AuthForm config={login_form_config} />
      <div className="signup-message">
        Don&apos;t have an account? <Link to={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
};
export { LoginPage };
