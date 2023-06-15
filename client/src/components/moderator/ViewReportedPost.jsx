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

  const fileUrl = post?.fileUrl;
  const fileType = post?.fileType;

  if (!post) return <CommonLoading />;

  const { content, user, dateTime, comments, savedByCount } = post;

  return (
    <div className="border p-3 rounded-md bg-white mx-auto mb-2">
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
      <div className="text-lg mb-4">{content}</div>
      {fileUrl && fileType === "image" ? (
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

      <div className="flex justify-end mt-3 text-sm">
        <button
          className="px-2 py- bg-red-500 text-white rounded-md mr-2"
          onClick={onRemove}
        >
          Remove
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded-md"
          onClick={onNoAction}
        >
          No Action
        </button>
      </div>
    </div>
  );
};

export default ViewReportedPost;
