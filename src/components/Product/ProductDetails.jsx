import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetails.css";
import { productPayment } from "../../assets/index";
import {
  removeSelectedProduct,
  selectedProduct,
  updateCart,
} from "../../redux/productsSlice";
import Loader from "../Common/Loader";
import StarRating from "./StarRating";
import Button from "../Button/Button";
import { toTitleCase } from "../../utils/util";
import appConfig from "../../config/apiURL";
const ProductDetails = () => {
  const { productId } = useParams();
  const cart = useSelector((state) => state.allProducts.cart);
  let product = useSelector((state) => state.allProducts.selectedProduct);
  product = product ?? {};
  const { image, title, price, category, description, quantity, rating } =
    product;

  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`${appConfig.BASE_URL}/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });

    let existingProduct = cart.find((item) => item.id == response.data.id);
    const updatedProduct = {
      ...response.data,
      quantity: existingProduct?.quantity ? existingProduct.quantity : 0,
    };

    dispatch(selectedProduct(updatedProduct));
  };

  useEffect(() => {
    if (productId && productId !== "") {
      fetchProductDetail(productId);
    }
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const existingProduct = product;
    const updatedProduct = {
      ...product,
      quantity: existingProduct?.quantity ? existingProduct.quantity + 1 : 1,
    };

    dispatch(updateCart(updatedProduct));
    dispatch(selectedProduct(updatedProduct));
  };

  const handleRemoveFromCart = (e, product) => {
    e.stopPropagation();
    const existingProduct = product;
    if (existingProduct) {
      const updatedProduct = {
        ...product,
        quantity: existingProduct?.quantity ? existingProduct.quantity - 1 : 1,
      };
      dispatch(updateCart(updatedProduct));
      dispatch(selectedProduct(updatedProduct));
    }
  };

  return (
    <div className="product-details-container">
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <div className="cart-items">
          <div className="cart-item">
            <div className="image-container">
              <img src={image} alt={title} />
            </div>
            <div className="item-details">
              <div className="header">{title}</div>
              <div className="meta price">${price}</div>
              <StarRating rate={rating.rate} count={rating.count} />
              <div className="description">{description}</div>
              <div className="meta category">
                <span className="category-title">Category: </span>
                {toTitleCase(category)}
              </div>
              <div
                className="cart-actions"
                onClick={(e) => e.stopPropagation()}
              >
                {product?.quantity > 0 ? (
                  <>
                    <div className="circle-button-container">
                      <button
                        className="circle-button"
                        onClick={(e) => handleRemoveFromCart(e, product)}
                      >
                        <span>-</span>
                      </button>
                      <span> {quantity}</span>
                      <button
                        className="circle-button"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      className="btn-link addToCart"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
              </div>
              <div className="bottom-image">
                <img
                  src={productPayment}
                  alt="payment-img"
                  className="footer-image"
                />
                <p>Guaranteed safe & secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
