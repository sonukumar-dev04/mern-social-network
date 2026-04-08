import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  sendConnectionRequest,
  removeConnection,
} from "../../redux/slices/connectionSlice";

const ProfileCard = ({
  profile,
  loading,
  error,
  showConnect = false,
  isSticky = false,
  currentUserId,
  sentRequests = [],
  connections = [],
  pendingRequests = [],
  showRemove,
  connectionId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwnProfile = profile?._id === currentUserId;

  const hasProfileInfo =
    profile?.profileId?.currentPost ||
    profile?.profileId?.currentCompany ||
    profile?.profileId?.currentLocation;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center shadow-sm text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center shadow-sm text-red-500 text-sm">
        {error}
      </div>
    );
  }

  const isPending = sentRequests?.some(
    (req) => req.connectionId?._id === profile?._id,
  );

  const isConnected = connections?.some(
    (conn) => conn.friend?._id === profile?._id,
  );

  const hasIncomingRequest = pendingRequests?.some(
    (req) => req.userId?._id === profile?._id,
  );

  const handleConnect = (e) => {
    e.stopPropagation();
    dispatch(sendConnectionRequest(profile._id));
  };

  const handleRemove = () => {
    dispatch(removeConnection(connectionId));
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isSticky ? "sticky top-6" : ""
      }`}
    >
      {/* Cover */}
      <div className="relative h-16 sm:h-24 md:h-28 w-full">
        <img
          src={
            profile?.coverPicture
              ? profile.coverPicture
              : import.meta.env.VITE_DEFAULT_COVER_PICTURE
          }
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Body */}
      <div className="px-2 sm:px-5 md:px-6 pb-3 sm:pb-5 md:pb-6 text-center relative cursor-pointer">
        <div onClick={() => navigate(`/profile/${profile._id}`)}>
          {/* Avatar */}
          <div className="-mt-7 sm:-mt-10 md:-mt-12">
            <img
              src={
                profile?.profilePicture
                  ? profile.profilePicture
                  : import.meta.env.VITE_DEFAULT_PROFILE_PICTURE
              }
              alt="profile"
              className="w-14 h-14 sm:h-20 sm:w-20 md:w-24 md:h-24 rounded-full mx-auto border-4 border-white object-cover shadow-sm"
            />
          </div>

          {/* Name */}
          <h2 className="mt-1.5 sm:mt-3 md:mt-4 text-xs sm:text-lg font-semibold text-gray-900 truncate">
            {profile?.name || "Guest User"}
          </h2>

          {/* Profile Info */}
          <div className="mt-1 sm:mt-3 min-h-[40px] sm:min-h-[60px]">
            {hasProfileInfo ? (
              <div className="space-y-0.5 sm:space-y-1.5">
                {profile?.profileId?.currentPost && (
                  <p className="text-xs font-medium text-gray-800 truncate">
                    {profile.profileId.currentPost}
                  </p>
                )}
                {profile?.profileId?.currentCompany && (
                  <p className="text-xs text-gray-500 truncate">
                    @{profile.profileId.currentCompany}
                  </p>
                )}
                {profile?.profileId?.currentLocation && (
                  <p className="text-xs text-gray-400 truncate hidden sm:block">
                    {profile.profileId.currentLocation}
                  </p>
                )}
              </div>
            ) : isOwnProfile ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${profile._id}`);
                }}
                className="mt-2 px-4 py-1.5 text-xs sm:text-sm font-medium border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
              >
                Complete Your Profile
              </button>
            ) : (
              <div className="space-y-0.5 sm:space-y-1.5">
                <p className="text-xs font-medium text-gray-800">
                  Open to Opportunities
                </p>
                <p className="text-xs text-gray-500">@Actively Networking</p>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Location Not Specified
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Connect Button */}
        {showConnect && !isOwnProfile && (
          <div className="mt-2 sm:mt-4">
            <button
              onClick={handleConnect}
              disabled={isConnected || isPending || hasIncomingRequest}
              className={`w-full py-1.5 sm:py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isConnected
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : isPending || hasIncomingRequest
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isConnected
                ? "Connected"
                : isPending || hasIncomingRequest
                  ? "Pending"
                  : "Connect"}
            </button>
          </div>
        )}

        {showRemove && (
          <button
            onClick={handleRemove}
            className="w-full py-1.5 sm:py-2.5 mt-2 sm:mt-3 rounded-full text-xs font-medium transition-all duration-200 bg-gray-300 text-gray-700 hover:bg-red-500 hover:text-white active:scale-95"
          >
            Remove Connection
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
