import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
