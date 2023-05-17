import { useNavigate, useLocation } from "react-router";
import { useMemo } from "react";

const PostOnProfile = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { body, fileUrl, community, createdAt, comments, likes, isMember } =
    post;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  return (
    <div
      className={`bg-white rounded-md p-4 shadow-md my-2 cursor-pointer ${
        isMember ? "" : "opacity-50 pointer-events-none"
      }`}
      onClick={() => {
        if (isMember) {
          navigate(`/my/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }
      }}
    >
      <div className="flex items-center">
        <div>
          <p className="text-sm text-gray-500">
            Posted in {community.name} on {createdAt}
          </p>
        </div>
      </div>
      <div className="my-3">
        {body && <p className="text-lg mb-4">{body}</p>}
        {fileUrl && isImageFile ? (
          <img
            className="w-[800px] h-auto rounded-xl my-3"
            src={fileUrl}
            alt={body}
            loading="lazy"
          />
        ) : (
          fileUrl && (
            <video
              className="w-[800px] h-auto rounded-xl my-3"
              src={fileUrl}
              controls
            />
          )
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {comments.length} Comments
              </span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {likes.length} Likes
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOnProfile;
