import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.css";
import {
  bannerOne,
  bannerTwo,
  bannerThree,
  bannerFour,
} from "../../assets/index";
const products = [
  {
    id: 1,
    title: "New Deals at Best Prices",
    price: "From $40.00",
    image: bannerOne,
  },
  {
    id: 2,
    title: "Colorful Redmi Note 6 Pro",
    price: 29.99,
    image: bannerTwo,
  },
  {
    id: 3,
    title: "1000 mAh Power Bank",
    price: 39.99,
    image: bannerThree,
  },
  {
    id: 4,
    title: "Buy Stylish Sunglasses for Men",
    price: 49.99,
    image: bannerFour,
  },
];

const FeaturedProducts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="featured-products">
      <h2 className="slider-heading">Featured Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: "10px" }}>
            <div
              className={`featured-product-carts featured-product-cart-${product.id}`}
            >
              <img src={product.image} alt={product.title} />
              <div className="text-container">
                <h1>{product.title}</h1>
                <p>${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
