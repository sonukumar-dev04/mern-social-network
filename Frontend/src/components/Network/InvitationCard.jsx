import { useDispatch } from "react-redux";
import {
  respondToRequest,
  getConnectionsList,
} from "../../redux/slices/connectionSlice";

const InvitationCard = ({
  type,
  pendingRequest,
  sentRequest,
  currentUserId,
}) => {
  const dispatch = useDispatch();

  const request = type === "received" ? pendingRequest : sentRequest;

  if (!request) return null;

  const user = type === "received" ? request?.userId : request?.connectionId;
  const profile = user?.profileId;

  const handleRespond = async (status) => {
    await dispatch(respondToRequest({ id: request._id, status }));
    dispatch(getConnectionsList(currentUserId));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 flex items-center justify-between gap-3 hover:shadow-md transition-all duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <img
          src={
            user?.profilePicture
              ? `http://localhost:4000/uploads/${user.profilePicture}`
              : "http://localhost:4000/uploads/default_profile.jpg"
          }
          alt="profile"
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-200 flex-shrink-0"
        />

        <div className="min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {user?.name || "Unknown User"}
          </h4>

          {profile?.currentPost ? (
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {profile.currentPost}
              {profile?.currentCompany && ` @${profile.currentCompany}`}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-gray-400">
              Open to Opportunities
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-shrink-0">
        {type === "received" ? (
         <div className="flex-shrink-0 flex flex-row gap-2">
            <button
              onClick={() => handleRespond(true)}
              className="w-full px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:bg-blue-700 transition"
            >
              Accept
            </button>
            <button
              onClick={() => handleRespond(false)}
              className="w-full px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:bg-gray-100 transition"
            >
              Ignore
            </button>
          </div>
        ) : (
          <button
            disabled
            className="px-3 sm:px-4 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-500 cursor-not-allowed whitespace-nowrap"
          >
            Pending
          </button>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
