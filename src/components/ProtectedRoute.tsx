import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  const currentUser = localStorage.getItem(
    "CognitoIdentityServiceProvider.f7b7901sek1k9fo7qa2ulf6rg.test.accessToken"
  );

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
