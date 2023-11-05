import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useUserState } from "../reducers/user.reducer";

const ProtectedRoute = () => {
  const userState = useUserState();
  const { currentUser } = userState;

  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
