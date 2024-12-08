import "./FavoriteProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateFavoriteCart } from "../../redux/productsSlice";
import { NavLink } from "react-router-dom";
import { toTitleCase } from "../../utils/util";
import StarRating from "../Product/StarRating";
import FavoriteService from "../../services/FavoriteService";
import Button from "../Button/Button";
const FavoriteProducts = () => {
  FavoriteService.getOrders();
  const favoriteProducts = useSelector(
    (state) => state.allProducts.favoriteProducts
  );
  const cartItems = useSelector((state) => state.allProducts.cart);
  const dispatch = useDispatch();

  const handleRemoveItemFromFavorite = (product) => {
    const existingProduct = favoriteProducts.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      const updatedProduct = {
        ...product,
        quantity: 0,
      };
      dispatch(updateFavoriteCart(updatedProduct));
    }
  };

  return (
    <div className="cart-container favorite-products-container">
      {favoriteProducts.length === 0 ? (
        <div className="empty-cart-container">
          <h1>Nothing added to Favorite</h1>
          <p>
            YLorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            amet in quibusdam illo incidunt enim sequi atque voluptatum, veniam
            aliquid quas doloremque quidem repudiandae porro laborum,
            perferendis ut, neque unde.
          </p>

          {/* <NavLink to={"/products"}>Add Products</NavLink> */}
          <Button
            className="btn-link btn-link-1 m-25"
            to="/products"
            isNavLink={true}
          >
            Add Products
          </Button>
        </div>
      ) : (
        <div className="checkout-container-parent">
          <h1>Favorite Products</h1>
          <div className="checkout-cart-container">
            <div className="cart-items">
              {favoriteProducts.map((item) => (
                <div key={item.id} className="cart-item">
                  <NavLink to={`/product/${item.id}`}>
                    <div className="image-container">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </NavLink>
                  <div className="item-details">
                    <div className="header">{item.title}</div>
                    <div className="meta">{item.description}</div>
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

                    <button
                      onClick={() => handleRemoveItemFromFavorite(item)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
