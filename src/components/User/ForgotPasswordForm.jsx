import Button from "../Button/Button";
import InputField from "./InputField";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <div className="login-container-parent">
      <div className="login-container">
        <h2 className="form-title">Forgot Password</h2>
        <p className="instruction-text">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>

        <form action="#" className="login-form">
          <InputField
            type="email"
            placeholder="Email address"
            icon="fa-envelope-o"
          />
          <Button className="btn-link btn-link-1 m-25" type="submit">
            Send Reset Link
          </Button>
        </form>

        <p className="signup-prompt">
          Remembered your password?{" "}
          <NavLink to="/login" className="signup-link">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
