import { FaMapMarkerAlt, FaPencilAlt } from "react-icons/fa";
import {
  FiUserPlus,
  FiMessageSquare,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdPending } from "react-icons/md";

const ProfileHeader = ({
  data,
  connections = [],
  sentRequests = [],
  pendingRequests = [],
  currentUserId,
  onEditHeader,
  onEditPictures,
  onConnect,
  onLogout,
  onDeleteAccount,
  onMessage,
}) => {
  const isOwnProfile = String(data?._id) === String(currentUserId);

  const isConnected = connections?.some(
    (conn) => String(conn.friend?._id) === String(currentUserId),
  );

  const isPending = sentRequests?.some(
    (req) => String(req.connectionId?._id) === String(data?._id),
  );

  const hasIncomingRequest = pendingRequests?.some(
    (req) => String(req.userId?._id) === String(data?._id),
  );

  const renderConnectionButton = () => {
    if (isConnected) {
      return (
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-200 text-gray-600 cursor-not-allowed">
          <IoCheckmarkCircle size={18} />
        </button>
      );
    }

    if (isPending || hasIncomingRequest) {
      return (
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-200 text-gray-600 cursor-not-allowed">
          <MdPending size={18} />
        </button>
      );
    }

    return (
      <button
        onClick={onConnect}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
      >
        <FiUserPlus size={18} />
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative">
      {/* COVER IMAGE */}
      <div className="relative">
        <img
          src={data?.coverPicture ? data.coverPicture : "/default_banner.jpg"}
          alt="cover"
          className="w-full h-56 object-cover"
        />

        {isOwnProfile && onEditPictures && (
          <button
            onClick={onEditPictures}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaPencilAlt size={14} />
          </button>
        )}

        {/* PROFILE IMAGE */}
        <div className="absolute -bottom-14 left-6">
          <div className="relative">
            <img
              src={
                data?.profilePicture
                  ? data.profilePicture
                  : "/default_profile.jpg"
              }
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
            />

            {isOwnProfile && onEditPictures && (
              <button
                onClick={onEditPictures}
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
              >
                <FaPencilAlt size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="pt-16 px-6 pb-6 relative">
        {isOwnProfile && onEditHeader && (
          <button
            onClick={onEditHeader}
            className="absolute top-4 right-6 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaPencilAlt size={14} />
          </button>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* LEFT INFO */}
          <div>
            <h1 className="text-2xl font-bold">{data?.name}</h1>

            <p className="text-gray-600 mt-1">
              {data?.profileId?.currentPost || "Open to Opportunities"}{" "}
              {data?.profileId?.currentCompany &&
                `@ ${data?.profileId?.currentCompany}`}
            </p>

            {data?.profileId?.currentLocation && (
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <FaMapMarkerAlt size={12} />
                {data.profileId.currentLocation}
              </div>
            )}

            <p className="text-blue-600 text-sm mt-2 font-medium">
              {connections?.length || 0} Connections
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {!isOwnProfile && (
              <>
                {renderConnectionButton()}

                <button
                  onClick={onMessage}
                  className="p-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <FiMessageSquare size={18} />
                </button>
              </>
            )}

            {isOwnProfile && (
              <>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-3 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                >
                  <FiLogOut size={18} />
                </button>

                <button
                  onClick={onDeleteAccount}
                  title="Delete Account"
                  className="p-3 rounded-full border border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                >
                  <FiTrash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
