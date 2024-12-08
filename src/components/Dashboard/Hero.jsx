import React from "react";
import "./Hero.css";
import { NavLink } from "react-router-dom";
import { homeBanner } from "../../assets/index";
import Button from "../Button/Button";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content-parent">
        <img src={homeBanner} className="home-banner" />
        <div className="hero-content">
          <Button className="btn-link" to="/products" isNavLink={true}>
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
