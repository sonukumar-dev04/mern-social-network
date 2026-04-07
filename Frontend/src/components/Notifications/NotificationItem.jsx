import { useDispatch } from "react-redux";
import { markAsRead } from "../../redux/slices/notificationSlice";
import { formatDistanceToNow } from "date-fns";

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification._id));
    }
  };

  return (
    <div
      onClick={handleMarkAsRead}
      className="flex gap-6 p-4 mt-3 border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
    >
      {/* Avatar */}
      <img
        src={
          notification?.sender?.profilePicture
            ? notification.sender.profilePicture // ← updated
            : "/default_profile.jpg" // ← updated
        }
        alt="user"
        className="w-14 h-14 rounded-full object-cover"
      />

      {/* Text Section */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800 leading-relaxed">
          {notification.content}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      {/* Blue unread dot */}
      {!notification.isRead && (
        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2"></div>
      )}
    </div>
  );
};

export default NotificationItem;
