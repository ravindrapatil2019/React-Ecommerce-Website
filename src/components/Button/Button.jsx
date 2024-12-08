import React from "react";
import "./Button.css";
import { NavLink } from "react-router-dom";
export default function Button({ to, isNavLink = false, children, ...rest }) {
  return (
    <>
      {isNavLink && to ? (
        <NavLink to={to} {...rest}>
          {children}
        </NavLink>
      ) : (
        <button {...rest}>{children}</button>
      )}
    </>
  );
}
