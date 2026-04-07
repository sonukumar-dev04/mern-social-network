import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAndProfile } from "../redux/slices/userSlice";
import { fetchPosts } from "../redux/slices/postSlice";
import ProfileCard from "../components/Dashboard/ProfileCard";
import CreatePostCard from "../components/Dashboard/CreatePostCard";
import PostCard from "../components/Dashboard/PostCard/PostCard";
import PromoCard from "../components/Dashboard/PromoCard";
import PostModal from "../components/modal/Modal";
import StoryBar from "../components/Story/StoryBar";

const Feed = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state) => state.user);
  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.post);
  const { user: authUser } = useSelector((state) => state.auth);
  const loggedInUserId = authUser?._id;

  useEffect(() => {
    dispatch(getUserAndProfile());
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="bg-gray-200 min-h-screen py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* ── MOBILE: single column, no sidebars ─────────────────── */}
        <div className="flex flex-col gap-4 md:hidden">
          <StoryBar />
          <CreatePostCard onOpen={() => setOpen(true)} profile={profile} />

          {postsLoading ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              Loading posts...
            </div>
          ) : postsError ? (
            <div className="bg-white rounded-xl p-6 text-center text-red-500">
              {postsError}
            </div>
          ) : posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No posts yet
            </div>
          )}
        </div>

        <div className="hidden md:grid md:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR — tablet & desktop */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <ProfileCard
              isSticky={true}
              profile={profile}
              currentUserId={loggedInUserId}
              loading={profileLoading}
              error={profileError}
            />
          </div>

          {/* CENTER FEED */}
          <div className="md:col-span-8 lg:col-span-6 space-y-4">
            <StoryBar />
            <CreatePostCard onOpen={() => setOpen(true)} profile={profile} />

            {postsLoading ? (
              <div className="bg-white rounded-xl p-6 text-center text-gray-500">
                Loading posts...
              </div>
            ) : postsError ? (
              <div className="bg-white rounded-xl p-6 text-center text-red-500">
                {postsError}
              </div>
            ) : posts?.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="bg-white rounded-xl p-6 text-center text-gray-500">
                No posts yet
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR — desktop only */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <PromoCard />
          </div>
        </div>
      </div>

      <PostModal isOpen={open} setOpen={setOpen} profile={profile} />
    </div>
  );
};

export default Feed;
