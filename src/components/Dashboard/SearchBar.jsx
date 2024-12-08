import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQueryString } from "../../redux/productsSlice";
import { NavLink } from "react-router-dom";
import "./SearchBar.css";
export default function SearchBar() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const searchRef = useRef();
  const containerRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  const setQuery = (queryString) => {
    dispatch(setQueryString(queryString));
    if (queryString) {
      const filteredSuggestions = products.filter(
        (product) =>
          product.title.toLowerCase().includes(queryString) ||
          product.category.toLowerCase().includes(queryString)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const handleNavLinkClick = () => {
    setSuggestions([]);
    searchRef.current.value = "";
    dispatch(setQueryString(""));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleNavLinkClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="search-bar-container-parent">
      <div className="search-bar-container">
        <input
          ref={searchRef}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search products"
          className="search-bar"
        />
        <span className="search-button">
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <div className="suggestions-list">
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((product) => (
              <NavLink
                key={product.id}
                to={`/product/${product.id}`}
                className="suggestion-link"
                onClick={handleNavLinkClick}
              >
                {product.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
