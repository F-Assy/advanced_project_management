import { useState } from "react";
import AuthInput from "./AuthInput";
import LoadingSpinner from "./LoadingSpinner";
import { login } from "../redux/user-slice/user-session-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthForm({ config }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //simulating loading for 1s
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    //simulating loading for 1s

    await config
      .action(formData)
      .then((response) => {
        //on success
        if (config.mode === "login") {
          //user credentials correct
          dispatch(
            login({ id: response.data[0].id, name: response.data[0].full_name })
          );
          navigate("/");
        } else if (config.mode === "signup") {
          //new user created successfully
          navigate("/login");
        }
      })
      .catch((error) => {
        setError(error.message);
        setFormData({ full_name: "", email: "", password: "" });
      });

    setIsSubmitting(false);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-title">{config.title}</h1>
      {config.inputs.map((input) => {
        return (
          <AuthInput
            config={input}
            handleInputChange={handleChange}
            value={formData[input.key]}
            key={input.key}
          />
        );
      })}
      <button
        className="auth-button"
        style={{ opacity: isSubmitting ? 0.8 : 1 }}
      >
        {isSubmitting ? <LoadingSpinner /> : config.submit_button}
      </button>
      {error && <div className="negative error">{error}</div>}
    </form>
  );
}

export default AuthForm;
