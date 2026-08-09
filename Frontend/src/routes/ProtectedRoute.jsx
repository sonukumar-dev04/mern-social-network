import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";

export const PublicRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <LoadingScreen />; // wait for fetchSelf to complete

  return user ? <Navigate to="/feed" /> : <Outlet />;
};

export const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <LoadingScreen />; // wait for fetchSelf to complete

  return user ? <Outlet /> : <Navigate to="/signin" />;
};
