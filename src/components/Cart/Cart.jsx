import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/productsSlice";
import { NavLink } from "react-router-dom";
import { toTitleCase } from "../../utils/util";
import StarRating from "../Product/StarRating";
import Button from "../Button/Button";
const Cart = () => {
  const cartItems = useSelector((state) => state.allProducts.cart);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    const updatedProduct = {
      ...product,
      quantity: existingProduct ? existingProduct.quantity + 1 : 1,
    };
    dispatch(updateCart(updatedProduct));
  };

  const handleRemoveFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProduct = {
        ...product,
        quantity: existingProduct.quantity - 1,
      };
      dispatch(updateCart(updatedProduct));
    }
  };

  const handleRemoveItemFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProduct = {
        ...product,
        quantity: 0,
      };
      dispatch(updateCart(updatedProduct));
    }
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <h1>Shopping Cart</h1>
          <p>🛒 Your cart is currently empty.</p>
          <p>But don’t worry! It’s a great time to start exploring.</p>
          <p>
            ✨ Continue Shopping to find amazing deals and products tailored
            just for you!
          </p>
          {/* <NavLink to={"/products"}>go to shopping</NavLink> */}

          <Button
            className="btn-link btn-link-1 m-25"
            to="/products"
            isNavLink={true}
          >
            Go to Shopping
          </Button>
        </div>
      ) : (
        <div className="checkout-container-parent">
          <h1>Shopping Cart</h1>
          <div className="checkout-cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="image-container">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <div className="header">{item.title}</div>
                    <div className="meta">
                      <span className="category-title">Category: </span>
                      {toTitleCase(item.category)}
                    </div>
                    <div className="meta">
                      <StarRating
                        rate={item.rating.rate}
                        count={item.rating.count}
                      />
                    </div>
                    <div className="meta price">$ {item.price}</div>
                    <div className="quantity">
                      <button
                        className="circle-button"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="circle-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItemFromCart(item)}
                      className="remove-button"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="h-5 w-5"
                        aria-hidden="true"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <section>
                  <h2 id="summary-heading">Order summary</h2>
                  <dl>
                    <div className="cart-summary-rows">
                      <dt>Subtotal</dt>
                      <dd>
                        <span>$ {totalPrice.toFixed(2)}</span>
                      </dd>
                    </div>
                    <div className="cart-summary-rows">
                      <dt>
                        <span>Shipping Estimate</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="h-5 w-5 text-gray-400 ml-2"
                          aria-hidden="true"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                      </dt>
                      <dd>
                        <span>$0.00</span>
                      </dd>
                    </div>
                    <div className="cart-summary-rows">
                      <dt className="flex text-sm text-gray-600">
                        <span>Tax Estimate</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="h-5 w-5 text-gray-400 ml-2"
                          aria-hidden="true"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                      </dt>
                      <dd>
                        <span>$.00</span>
                      </dd>
                    </div>
                    <div className="cart-summary-rows">
                      <dt>Total Discount</dt>
                      <dd>
                        <span>$0.00</span>
                      </dd>
                    </div>
                    <div className="cart-summary-rows">
                      <dt>Order Total</dt>
                      <dd>
                        <span>$ {totalPrice.toFixed(2)}</span>
                      </dd>
                    </div>
                  </dl>
                  {/*  <button className="checkout-button">
                    Proceed to Checkout
                  </button> */}
                  <Button className="btn-link btn-link-1 m-25 checkout-btn disabled">
                    Proceed to Checkout
                  </Button>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
