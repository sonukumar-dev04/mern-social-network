import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByPostId } from "../../../redux/slices/commentSlice";
import { toggleLikePost } from "../../../redux/slices/postSlice";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostActions from "./PostActions";
import CommentsSection from "./CommentsSection";

const PostCard = ({ post, compact = false }) => {
  const dispatch = useDispatch();
  const authUserId = useSelector((state) => state.user.profile?._id);
  const { commentsByPost, loading } = useSelector((state) => state.comments);

  const [showComments, setShowComments] = useState(false);

  const comments = commentsByPost[post._id] || [];
  const isLiked = Array.isArray(post.likes) && post.likes.includes(authUserId);
  const isPostOwner = authUserId === post.userId?._id;
  const likeCount = post.likes?.length || 0;
  const commentCount = comments.length || 0;

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
    if (!comments.length) dispatch(fetchCommentsByPostId(post._id));
  };

  const handleToggleLike = () => {
    dispatch(toggleLikePost(post._id));
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl transition hover:shadow-md ${
        compact
          ? "w-[320px] min-w-[320px] h-[380px] flex flex-col"
          : "w-full mb-5"
      }`}
    >
      <PostHeader post={post} compact={compact} isPostOwner={isPostOwner} />
      <PostContent post={post} compact={compact} />
      <PostFooter
        likeCount={likeCount}
        commentCount={commentCount}
        compact={compact}
      />

      {!compact && (
        <>
          <PostActions
            isLiked={isLiked}
            onToggleLike={handleToggleLike}
            onToggleComments={handleToggleComments}
          />
          {showComments && (
            <CommentsSection
              post={post}
              comments={comments}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostCard;
