import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  getUserProfileById,
  updateUserAndProfile,
  updatePictures,
} from "../redux/slices/userSlice";

import {
  getConnectionsList,
  sendConnectionRequest,
  getSentRequests,
  getPendingRequests,
} from "../redux/slices/connectionSlice";

import { fetchUserPosts } from "../redux/slices/postSlice";
import { logoutUser, deleteAccount } from "../redux/slices/authSlice";
import { addConversation } from "../redux/slices/conversationSlice";

import ProfileHeader from "../components/Profile/ProfileHeader";
import AboutSection from "../components/Profile/AboutSection";
import SkillsSection from "../components/Profile/SkillsSection";
import EducationSection from "../components/Profile/EducationSection";
import ExperienceSection from "../components/Profile/ExperienceSection";
import ActivitySection from "../components/Profile/ActivitySection";
import EditProfileModal from "../components/Profile/EditProfileModal";

import MessageModal from "../components/Profile/messageModal/MessageModal";
import DeleteAccountModal from "../components/Profile/DeleteAccountModal";

const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 space-y-6 animate-pulse">
    {/* HEADER CARD */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="h-32 sm:h-48 w-full bg-gray-200" />
      <div className="px-6 pb-6 relative">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-300 border-4 border-white -mt-14 sm:-mt-16" />
        <div className="h-5 w-40 bg-gray-200 rounded mt-4" />
        <div className="h-3 w-56 bg-gray-200 rounded mt-3" />
        <div className="h-3 w-24 bg-gray-200 rounded mt-3" />
      </div>
    </div>

    {/* ABOUT */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-4/5 bg-gray-200 rounded" />
    </div>

    {/* SKILLS */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>

    {/* EDUCATION */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="h-3 w-2/3 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const userId = id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editType, setEditType] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { profile, loading: userLoading } = useSelector((state) => state.user);

  const {
    connections,
    sentRequests,
    pendingRequests,
    loading: connLoading,
  } = useSelector((state) => state.connections);

  const { posts, loading: postLoading } = useSelector((state) => state.post);

  const { user: loggedInUser, loading: authLoading } = useSelector(
    (state) => state.auth,
  );

  const isOwnProfile = loggedInUser?._id === userId;

  //  FETCH PROFILE DATA

  useEffect(() => {
    if (!userId) return;

    dispatch(getUserProfileById(userId));
    dispatch(getConnectionsList(userId));
    dispatch(getSentRequests());
    dispatch(getPendingRequests());
    dispatch(fetchUserPosts(userId));
  }, [userId, dispatch]);

  if (userLoading || connLoading || postLoading) {
    return (
      <div className="bg-gray-200 min-h-screen py-6">
        <ProfileSkeleton />
      </div>
    );
  }

  //  SAVE PROFILE DATA

  const handleSave = async (type, updatedData) => {
    try {
      if (type === "pictures") {
        await dispatch(updatePictures(updatedData)).unwrap();
      } else {
        await dispatch(updateUserAndProfile(updatedData)).unwrap();
      }

      setEditType(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  //  SEND CONNECTION REQUEST

  const handleConnect = async () => {
    try {
      await dispatch(sendConnectionRequest(userId)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout user

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Delete account permanently (password-confirmed)

  const handleDeleteAccount = async (password) => {
    setDeleteError(null);
    try {
      await dispatch(deleteAccount(password)).unwrap();
      navigate("/signin");
    } catch (err) {
      setDeleteError(err || "Failed to delete account");
    }
  };

  const handleSendMessage = async (formData) => {
    try {
      await dispatch(addConversation(formData)).unwrap();
      setShowMessageModal(false);
    } catch (err) {
      console.error("Message failed:", err);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* PROFILE HEADER */}
        <ProfileHeader
          data={profile}
          connections={connections}
          sentRequests={sentRequests}
          pendingRequests={pendingRequests}
          currentUserId={loggedInUser?._id}
          isOwnProfile={isOwnProfile}
          onConnect={handleConnect}
          onMessage={() => setShowMessageModal(true)}
          onLogout={handleLogout}
          onDeleteAccount={() => {
            setDeleteError(null);
            setShowDeleteModal(true);
          }}
          onEditHeader={isOwnProfile ? () => setEditType("header") : undefined}
          onEditPictures={
            isOwnProfile ? () => setEditType("pictures") : undefined
          }
        />

        {/* ABOUT */}
        <AboutSection
          data={profile?.profileId?.bio}
          onEdit={isOwnProfile ? () => setEditType("bio") : undefined}
        />

        {/* SKILLS */}
        <SkillsSection
          data={profile?.profileId?.skills}
          onEdit={isOwnProfile ? () => setEditType("skills") : undefined}
        />

        {/* EDUCATION */}
        <EducationSection
          data={profile?.profileId?.education}
          onEdit={isOwnProfile ? () => setEditType("education") : undefined}
        />

        {/* EXPERIENCE */}
        <ExperienceSection
          data={profile?.profileId?.pastWork}
          onEdit={isOwnProfile ? () => setEditType("experience") : undefined}
        />

        {/* ACTIVITY / POSTS */}
        <ActivitySection posts={posts} userId={userId} />
      </div>

      {/* EDIT PROFILE MODAL */}
      {editType && isOwnProfile && (
        <EditProfileModal
          type={editType}
          userData={profile}
          profileData={profile?.profileId}
          onSave={handleSave}
          onClose={() => setEditType(null)}
        />
      )}

      {showMessageModal && (
        <MessageModal
          receiver={profile}
          onSend={handleSendMessage}
          onClose={() => setShowMessageModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          loading={authLoading}
          error={deleteError}
        />
      )}
    </div>
  );
};

export default Profile;
