import Button from "../Button/Button";
import "./Orders.css";

import { NavLink } from "react-router-dom";

const Orders = () => {
  return (
    <div className="cart-container">
      <div className="empty-cart-container">
        <h1>You haven’t placed any orders yet. </h1>
        <p>Start shopping now and discover great deals just for you!</p>
        <Button
          className="btn-link btn-link-1 m-25"
          to="/products"
          isNavLink={true}
        >
          Go to Shopping
        </Button>
      </div>
    </div>
  );
};

export default Orders;
