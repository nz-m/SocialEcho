import { useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import Like from "./Like";
import { IoIosArrowBack } from "react-icons/io";
const SavedPost = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { content, fileUrl, user, community, createdAt, comments } = post;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-6 py-6 rounded-md border bg-white mb-6 w-full">
      <p className="border border-dashed border-primary cursor-pointer px-2 py-2 w-7 h-7 flex justify-center items-center mb-3 rounded-full">
        <IoIosArrowBack
          className="text-primary text-xl font-semibold"
          onClick={handleBack}
        />
      </p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{community.name}</p>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }}
      >
        <p className="mt-3">{content}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <img
              className="w-[800px] h-auto rounded-md mt-3"
              src={fileUrl}
              alt={content}
              loading="lazy"
            />
          ) : (
            fileUrl && (
              <video
                className="w-[800px] h-auto rounded-md mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Like post={post} />
          <Link to={`/post/${post._id}`}>
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedPost;
