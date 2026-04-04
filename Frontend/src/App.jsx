import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSelf } from "./redux/slices/authSlice"; 

import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Feed from "./pages/Feed";
import Network from "./pages/Network";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import ProfilePosts from "./pages/ProfilePosts";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

import { PublicRoute, PrivateRoute } from "./routes/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ On app mount, restore user from cookie
    dispatch(fetchSelf());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/network" element={<Network />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/posts" element={<ProfilePosts />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
