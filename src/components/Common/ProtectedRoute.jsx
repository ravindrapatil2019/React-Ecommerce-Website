import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const location = useLocation();
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
