import React from "react";
import Hero from "../components/Dashboard/Hero";
import FeaturedProducts from "../components/Dashboard/FeaturedProducts";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Hero />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
