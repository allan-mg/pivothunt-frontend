import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, onSignInRequired, children }) {
  useEffect(() => {
    if (!isLoggedIn) {
      onSignInRequired();
    }
  }, [isLoggedIn, onSignInRequired]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
