import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; // wait for fetchSelf to complete

  return user ? <Navigate to="/feed" /> : <Outlet />;
};

export const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; // wait for fetchSelf to complete

  return user ? <Outlet /> : <Navigate to="/signin" />;
};
