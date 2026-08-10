import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvitationCard from "../components/Network/InvitationCard";
import ProfileCard from "../components/Dashboard/ProfileCard";
import { getAllUserProfiles } from "../redux/slices/userSlice";
import {
  getConnectionsList,
  getSentRequests,
  getPendingRequests,
} from "../redux/slices/connectionSlice";

const TABS = [
  { key: "discover", label: "Discover", fullLabel: "Discover People" },
  { key: "received", label: "Incoming", fullLabel: "Incoming Requests" },
  { key: "sent", label: "Sent", fullLabel: "Sent Requests" },
  { key: "connections", label: "Connections", fullLabel: "Connections" },
];

const NetworkCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
    <div className="h-16 sm:h-20 w-full bg-gray-200" />
    <div className="px-4 pb-4 text-center -mt-8">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto bg-gray-300 border-4 border-white" />
      <div className="h-3 w-20 bg-gray-200 rounded mx-auto mt-3" />
      <div className="h-2.5 w-16 bg-gray-200 rounded mx-auto mt-2" />
      <div className="h-7 w-full bg-gray-200 rounded-full mt-3" />
    </div>
  </div>
);

const Network = () => {
  const [activeTab, setActiveTab] = useState("discover");

  const dispatch = useDispatch();

  const { profile, allUsers, usersLoading } = useSelector(
    (state) => state.user,
  );
  const { connections, sentRequests, pendingRequests } = useSelector(
    (state) => state.connections,
  );

  const incomingCount =
    pendingRequests?.filter((req) => req?.userId?._id)?.length || 0;
  const sentCount =
    sentRequests?.filter((req) => req?.connectionId?._id)?.length || 0;
    
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);

  useEffect(() => {
    if (!profile?._id) return;
    dispatch(getAllUserProfiles());
    dispatch(getConnectionsList(profile._id));
    dispatch(getSentRequests());
    dispatch(getPendingRequests());
  }, [dispatch, profile?._id]);

  return (
    <div className="bg-gray-200 min-h-screen py-4 sm:py-6 md:py-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 space-y-8 sm:space-y-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          My Network
        </h1>

        {/* Tab Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-1 overflow-hidden">
          <div className="relative flex">
            {/* Sliding indicator */}
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-xl transition-all duration-300 ease-in-out"
              style={{
                width: `${100 / TABS.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />

            {TABS.map(({ key, label, fullLabel }) => {
              const count =
                key === "received"
                  ? incomingCount
                  : key === "sent"
                    ? sentCount
                    : 0;
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1 sm:gap-2 px-1">
                    {/* Short label on mobile, full label on sm+ */}
                    <span className="block sm:hidden leading-tight text-center">
                      {label}
                    </span>
                    <span className="hidden cursor-pointer sm:block">
                      {fullLabel}
                    </span>

                    {count > 0 && (
                      <span
                        className={`flex-shrink-0 min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] flex items-center justify-center px-1 text-xs font-semibold rounded-full ${
                          isActive
                            ? "bg-white text-blue-600"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-3 sm:space-y-4">
          {activeTab === "discover" && (
            <>
              {usersLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <NetworkCardSkeleton key={i} />
                  ))}
                </div>
              ) : allUsers?.filter((u) => profile?._id && u._id !== profile._id)
                  ?.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No people to discover right now.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-5">
                  {allUsers
                    ?.filter((u) => profile?._id && u._id !== profile._id)
                    ?.map((u) => (
                      <ProfileCard
                        key={u._id}
                        profile={u}
                        showConnect={true}
                        currentUserId={profile?._id}
                        sentRequests={sentRequests}
                        connections={connections}
                        pendingRequests={pendingRequests}
                      />
                    ))}
                </div>
              )}
            </>
          )}

          {activeTab === "connections" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-5">
              {connections?.length > 0 ? (
                connections.map((conn) => (
                  <ProfileCard
                    key={conn.friend._id}
                    profile={conn.friend}
                    showConnect={false}
                    currentUserId={profile?._id}
                    showRemove={true}
                    connectionId={conn.connectionId}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-400 text-sm">
                  No connections yet.
                </div>
              )}
            </div>
          )}

          {activeTab === "received" && (
            <div className="space-y-3 sm:space-y-4">
              {pendingRequests?.filter((req) => req?.userId?._id)?.length >
              0 ? (
                pendingRequests
                  .filter((req) => req?.userId?._id)
                  .map((req) => (
                    <InvitationCard
                      key={req._id}
                      type="received"
                      pendingRequest={req}
                    />
                  ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No incoming requests.
                </div>
              )}
            </div>
          )}

          {activeTab === "sent" && (
            <div className="space-y-3 sm:space-y-4">
              {sentRequests?.filter((req) => req?.connectionId?._id)?.length >
              0 ? (
                sentRequests
                  .filter((req) => req?.connectionId?._id)
                  .map((req) => (
                    <InvitationCard
                      key={req._id}
                      type="sent"
                      sentRequest={req}
                    />
                  ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No sent requests.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Network;
