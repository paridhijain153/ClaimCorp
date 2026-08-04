import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants/routes";

function ProtectedRoute({ children }) {
  const {
    token,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!token) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;