const PostFooter = ({ likeCount, commentCount, compact }) => (
  <div
    className={`px-5 py-3 text-sm text-gray-500 flex justify-between border-t border-gray-100 ${
      compact ? "mt-auto" : ""
    }`}
  >
    <span>
      {likeCount} {likeCount === 1 ? "Like" : "Likes"}
    </span>
    <span>
      {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
    </span>
  </div>
);

export default PostFooter;
