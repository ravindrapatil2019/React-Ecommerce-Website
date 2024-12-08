import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Dashboard/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { selectedCategory } from "../../redux/productsSlice";
import { toTitleCase } from "../../utils/util";
const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/products" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "Contact Us", link: "/contact" },
];

const Header = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const cartItemCount = useSelector((state) => {
    return state.allProducts.cart.reduce(
      (total, item) => total + (item.quantity ?? 0),
      0
    );
  });
  const favoriteProductCount = useSelector((state) => {
    return state.allProducts.favoriteProducts.reduce(
      (total, item) => total + (item.quantity ?? 0),
      0
    );
  });

  const categories = [...new Set(products?.map((product) => product.category))];
  const handleCategoryChange = (event) => {
    dispatch(selectedCategory(event.target.value));
  };
  return (
    <div className="header-container">
      <header className="nav-header">
        <div className="logo">
          <NavLink to="/">
            <img src="./assets/logo.jpg" alt="Logo" />
          </NavLink>
        </div>
        <SearchBar />
        <div className="header-icons">
          <NavLink to="/favoriteProducts" className="icon">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>{favoriteProductCount}</span>
          </NavLink>
          <NavLink to="/cart" className="icon">
            <span>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
            <span>{cartItemCount}</span>
          </NavLink>
          <NavLink to="/login" className="icon">
            <i className="fa fa-user" aria-hidden="true"></i>
          </NavLink>
        </div>
      </header>
      <div className="header-bottom">
        <nav className="nav">
          <ul className="nav-links">
            <li key="0">
              <select onChange={(event) => handleCategoryChange(event)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {toTitleCase(category)}
                  </option>
                ))}
              </select>
            </li>
            {bottomNavigation.map((ele, i) => {
              return (
                <li key={i + 1}>
                  <NavLink
                    to={ele.link}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    <span className="label">{ele.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
