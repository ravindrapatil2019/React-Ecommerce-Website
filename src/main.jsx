import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import FavoriteProductsPage from "./pages/FavoriteProductsPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "products", element: <ProductListingPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "orders", element: <ProtectedRoute element={<OrdersPage />} /> },
      {
        path: "favoriteProducts",
        element: <ProtectedRoute element={<FavoriteProductsPage />} />,
      },
      { path: "forgotPassword", element: <ForgotPasswordPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
