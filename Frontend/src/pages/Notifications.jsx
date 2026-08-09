import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/Dashboard/ProfileCard";
import ManageNotificationsCard from "../components/Notifications/ManageNotificationsCard";
import NotificationItem from "../components/Notifications/NotificationItem";
import { fetchNotifications } from "../redux/slices/notificationSlice";

const NotificationSkeletonRow = () => (
  <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-gray-100 animate-pulse">
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-200 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-3/5 bg-gray-200 rounded" />
      <div className="h-2.5 w-24 bg-gray-200 rounded" />
    </div>
  </div>
);

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();

  const { notifications, loading } = useSelector(
    (state) => state.notifications,
  );
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);
  const loggedInUserId = authUser?._id;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "connection") return n.type === "friendRequest";
    if (activeTab === "post") return n.type === "like" || n.type === "comment";
    return false;
  });

  return (
    <div className="bg-gray-200 min-h-screen py-4 sm:py-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* LEFT SIDEBAR — hidden on mobile, visible md+ */}
          <div className="hidden md:block md:col-span-3 space-y-4 sticky top-6 self-start">
            <ProfileCard
              profile={profile}
              currentUserId={loggedInUserId}
              loading={profileLoading}
              error={profileError}
            />
            <ManageNotificationsCard />
          </div>

          {/* CENTER CONTENT — full width on mobile, 9 cols on md+ */}
          <div className="w-full md:col-span-9">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* HEADER */}
              <div className="p-4 sm:p-5 border-b border-gray-200 space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Notifications
                </h1>

                {/* FILTER TABS */}
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {["all", "post", "connection"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition ${
                        activeTab === tab
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tab === "all"
                        ? "All"
                        : tab === "post"
                          ? "My posts"
                          : "Connections"}
                    </button>
                  ))}
                </div>
              </div>

              {/* NOTIFICATIONS LIST */}
              {loading ? (
                <div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <NotificationSkeletonRow key={i} />
                  ))}
                </div>
              ) : filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <NotificationItem key={n._id} notification={n} />
                ))
              ) : (
                <div className="p-10 text-center font-bold text-gray-500 text-sm">
                  No new notifications at the moment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
