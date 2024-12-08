import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/Common";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Common/Loader";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";
import AuthService from "./services/AuthService";
function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.allProducts);

  // Bypassing the login process for testing purposes
  AuthService.login();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
