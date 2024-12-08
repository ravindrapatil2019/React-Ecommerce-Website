import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, updateFavoriteCart } from "../../redux/productsSlice";
import Loader from "../Common/Loader";
import StarRating from "./StarRating";
import "./ProductListing.css";
import Button from "../Button/Button";
import apiConfig from "../../config/appConfig";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const queryString = useSelector((state) => state.allProducts.queryString);
  const selectedCategory = useSelector(
    (state) => state.allProducts.selectedCategory
  );
  const cart = useSelector((state) => state.allProducts.cart);
  const [page, setPage] = useState(1);
  const noOfItemPerPage = apiConfig.noOfItemPerPage;
  const favoriteProducts = useSelector(
    (state) => state.allProducts.favoriteProducts
  );

  const dispatch = useDispatch();

  let filteredProducts = products?.filter(
    (product) =>
      product.title.toLowerCase().includes(queryString) ||
      product.category.toLowerCase().includes(queryString)
  );

  filteredProducts = filteredProducts?.filter((product) => {
    const lowerCategory = selectedCategory?.toLowerCase() || "";
    return (
      lowerCategory === "" || product.category.toLowerCase() === lowerCategory
    );
  });

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    const existingProduct = cart.find((item) => item.id === product.id);
    const updatedProduct = {
      ...product,
      quantity: existingProduct ? existingProduct.quantity + 1 : 1,
    };
    dispatch(updateCart(updatedProduct));
  };

  const handleRemoveFromCart = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 0) {
      const updatedProduct = {
        ...product,
        quantity: existingProduct.quantity - 1,
      };
      dispatch(updateCart(updatedProduct));
    } else if (existingProduct) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      dispatch(updateCart(updatedCart));
    }
  };

  const handleAddToFavoriteCart = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    const existingProduct = favoriteProducts.find(
      (item) => item.id === product.id
    );
    const updatedProduct = {
      ...product,
      quantity: existingProduct ? 0 : 1,
    };
    dispatch(updateFavoriteCart(updatedProduct));
  };
  const selectPageHandler = (selectedPage) => {
    const totalPages = Math.ceil(filteredProducts.length / noOfItemPerPage);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  if (products.length == 0) {
    return <Loader />;
  }
  const renderList = filteredProducts
    .slice((page - 1) * noOfItemPerPage, page * noOfItemPerPage)
    .map((product) => {
      const { id, title, image, price, category, rating } = product;

      const cartItem = cart.find((item) => item.id === id) || {};

      const favoriteProduct =
        favoriteProducts.findIndex((item) => item.id === id) > -1;

      return (
        <div className="product" key={id}>
          <NavLink to={`/product/${id}`}>
            <div className="cards">
              <button
                className="addToFavorite"
                onClick={(event) => handleAddToFavoriteCart(event, product)}
              >
                {favoriteProduct ? (
                  <i className="fa fa-heart" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                )}
              </button>
              <div className="card">
                <div className="image">
                  <img src={image} alt={title} />
                </div>
                <div className="content">
                  <div className="meta">{category}</div>
                  <div className="header">{title}</div>
                  <StarRating rate={rating.rate} count={rating.count} />
                  <div className="meta price">$ {price}</div>
                  <div className="cart-actions">
                    {cartItem.quantity > 0 ? (
                      <div className="circle-button-container">
                        <button
                          className="circle-button"
                          onClick={(event) =>
                            handleRemoveFromCart(event, product)
                          }
                        >
                          <span>-</span>
                        </button>
                        <span> {cartItem.quantity}</span>
                        <button
                          className="circle-button"
                          onClick={(event) => handleAddToCart(event, product)}
                        >
                          <span>+</span>
                        </button>
                      </div>
                    ) : (
                      <Button
                        className="btn-link addToCart"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      );
    });

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="no-products-message">
          <i
            className="fa fa-search"
            aria-hidden="true"
            style={{ fontSize: "2rem", marginBottom: "10px" }}
          ></i>
          <p>No products found matching your search criteria.</p>
        </div>
      ) : (
        <>
          <div className="product-container">{renderList}</div>

          {filteredProducts.length > 0 && (
            <div className="pagination">
              {/* Previous Page Button */}
              <button
                onClick={() => selectPageHandler(page - 1)}
                className={page > 1 ? "" : "pagination__disable"}
              >
                ◀
              </button>

              {/* Dynamic Pagination Buttons */}
              {[
                ...Array(Math.ceil(filteredProducts.length / noOfItemPerPage)),
              ].map((_, i) => (
                <button
                  key={i}
                  className={
                    page === i + 1
                      ? "pagination-buttons pagination__selected"
                      : "pagination-buttons"
                  }
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => selectPageHandler(page + 1)}
                className={
                  page < Math.ceil(filteredProducts.length / noOfItemPerPage)
                    ? ""
                    : "pagination__disable"
                }
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductComponent;
