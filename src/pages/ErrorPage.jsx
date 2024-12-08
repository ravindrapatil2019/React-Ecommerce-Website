import React from "react";
import Button from "../components/Button/Button";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button className="btn-link btn-link-1" to="/" isNavLink={true}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
