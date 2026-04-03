import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/feed" /> : <Outlet />;
};

export const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
