import { BASE_URL } from "./utils/postUtils";

const PostContent = ({ post, compact }) => (
  <div
    className={`px-5 py-4 ${compact ? "flex flex-col flex-grow overflow-hidden" : ""}`}
  >
    <p
      className={`text-gray-800 text-[15px] leading-relaxed ${compact ? "line-clamp-3" : ""}`}
    >
      {post.body}
    </p>
    {post.media && (
      <div
        className={`mt-4 overflow-hidden rounded-xl ${compact ? "h-40" : "max-h-[520px]"}`}
      >
        <img
          src={`${BASE_URL}/uploads/${post.media}`}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>
    )}
  </div>
);

export default PostContent;
