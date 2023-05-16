import { useMemo } from "react";
import { deletePostAction } from "../../redux/actions/postActions";
import { removeReportedPostAction } from "../../redux/actions/communityActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CommonLoading from "../loader/CommonLoading";

const ViewReportedPost = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemove = async () => {
    await dispatch(deletePostAction(post._id));
    navigate(-1);
  };

  const onNoAction = async () => {
    await dispatch(removeReportedPostAction(post._id));
    navigate(-1);
  };

  let fileUrl = post?.fileUrl;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  if (!post) return <CommonLoading />;

  const { body, user, dateTime, comments, savedByCount } = post;

  return (
    <div className="shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg bg-white mx-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={user.avatar}
            alt="user"
          />
          <div className="text-sm font-medium text-gray-700">{user.name}</div>
        </div>
        <div className="text-sm text-gray-500">{dateTime}</div>
      </div>
      <div className="text-lg mb-4">{body}</div>
      {fileUrl && isImageFile ? (
        <img
          className="w-[800px] h-auto rounded-xl mt-3"
          src={fileUrl}
          alt={body}
          loading="lazy"
        />
      ) : (
        fileUrl && (
          <video
            className="w-[800px] h-auto rounded-xl mt-3"
            src={fileUrl}
            controls
          />
        )
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              {comments.length} Comments
            </div>
            <div className="text-sm text-gray-500">{savedByCount} Saves</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
          onClick={onRemove}
        >
          Remove
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={onNoAction}
        >
          No Action
        </button>
      </div>
    </div>
  );
};

export default ViewReportedPost;
