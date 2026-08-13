import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileCard from "../components/Dashboard/ProfileCard";
import PromoCard from "../components/Dashboard/PromoCard";

import { fetchUserPosts } from "../redux/slices/postSlice";
import { getUserProfileById } from "../redux/slices/userSlice";
import PostCard from "../components/Dashboard/PostCard/PostCard";

const PostSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-2.5 w-20 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-4/5 bg-gray-200 rounded" />
        </div>
        <div className="h-48 w-full bg-gray-200 rounded-lg" />
        <div className="flex gap-4 mt-4">
          <div className="h-3 w-14 bg-gray-200 rounded" />
          <div className="h-3 w-14 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

const ProfilePosts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { posts, loading: postsLoading } = useSelector((state) => state.post);
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.user,
  );
  const { user: authUser } = useSelector((state) => state.auth);

  const loggedInUserId = authUser?._id;

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPosts(id));
      dispatch(getUserProfileById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="bg-gray-200 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <ProfileCard
              isSticky={true}
              profile={profile}
              currentUserId={loggedInUserId}
              loading={profileLoading}
            />
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="bg-white rounded-xl px-5 py-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Posts</h2>
              <p className="text-sm text-gray-500">
                User activity on the platform
              </p>
            </div>

            {postsLoading ? (
              <PostSkeleton />
            ) : posts?.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="bg-white rounded-xl p-6 text-center text-gray-500">
                No posts yet
              </div>
            )}
          </div>

          {/* RIGHT — PromoCard: hidden on mobile & tablet, visible lg+ */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <PromoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
