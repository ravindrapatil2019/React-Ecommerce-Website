import SocialLogin from "./SocialLogin";
import InputField from "./InputField";
import "./LoginForm.css";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Button from "../Button/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const email = "email@example.com";
      const password = "password";

      await AuthService.login(email, password);
      navigate(from);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />

      <p className="separator">
        <span>or</span>
      </p>

      {/* Update the form to use onSubmit */}
      <form action="#" className="login-form" onSubmit={handleLogin}>
        <InputField
          type="email"
          placeholder="Email address"
          icon="fa-envelope-o"
        />
        <InputField type="password" placeholder="Password" icon="fa-lock" />

        <NavLink to="/forgotPassword" className="forgot-password-link">
          Forgot password?
        </NavLink>
        {/* <button type="submit" className="login-button">
          Log In
        </button> */}

        <Button className="btn-link btn-link-1 m-25 form-btn" type="submit">
          Log In
        </Button>
      </form>

      <p className="signup-prompt">
        Don&apos;t have an account?{" "}
        <NavLink to="/signup" className="signup-link">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default LoginForm;
