import React from "react";
import FooterTop from "./FooterTop";
import { payment } from "../../assets/index";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <FooterTop />
      <div className="footer-container">
        <p className="footer-note">
          @2024 E-commerce solutions. All rights reserved.
        </p>
        <img src={payment} alt="payment-img" className="footer-image" />
      </div>
    </>
  );
};

export default Footer;
