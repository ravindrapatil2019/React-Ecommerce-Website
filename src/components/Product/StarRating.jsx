import React from "react";
import "./StarRating.css";

const StarRating = ({ rate, count }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="star-rating">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i} className="star full">
          <i className="fa fa-star"></i>
        </span>
      ))}
      {halfStar && (
        <span className="star half">
          <i className="fa fa-star-half-o"></i>
        </span>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={i} className="star empty">
          <i className="fa fa-star-o"></i>
        </span>
      ))}
      <div className="total-reviews">({count})</div>
    </div>
  );
};

export default StarRating;
