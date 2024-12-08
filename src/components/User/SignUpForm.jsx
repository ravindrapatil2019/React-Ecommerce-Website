import SocialLogin from "./SocialLogin";
import InputField from "./InputField";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

const SignUpForm = () => {
  return (
    <div className="login-container-parent">
      <div className="login-container">
        <h2 className="form-title">Sign up with</h2>
        <SocialLogin />

        <p className="separator">
          <span>or</span>
        </p>

        <form action="#" className="login-form">
          <InputField type="text" placeholder="Full Name" icon="fa-user-o" />
          <InputField
            type="email"
            placeholder="Email address"
            icon="fa-envelope-o"
          />
          <InputField type="password" placeholder="Password" icon="fa-lock" />
          <InputField
            type="password"
            placeholder="Confirm Password"
            icon="fa-lock"
          />

          {/*  <button type="submit" className="login-button">
          Sign Up
        </button> */}

          <Button className="btn-link btn-link-1 m-25 form-btn" type="submit">
            Sign Up
          </Button>
        </form>

        <p className="signup-prompt">
          Already have an account?{" "}
          <NavLink to="/login" className="signup-link">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
