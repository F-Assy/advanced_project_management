import { Link } from "react-router-dom";
import "../../main-css/login-styles.css";
import AuthForm from "../../components/AuthForm";
import { signup_form_config } from "./form-config";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const SignupPage = () => {
  useAuthRedirect("signup");
  return (
    <div className="auth-page">
      <AuthForm config={signup_form_config} />
      <div className="signup-message">
        Already have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
};
export { SignupPage };
