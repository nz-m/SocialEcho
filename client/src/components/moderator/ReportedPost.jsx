import { useNavigate, useParams } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";

const ReportedPost = ({ reportedPost }) => {
  const navigate = useNavigate();
  const { post, reportedBy, reportReason, reportDate } = reportedPost;
  const { communityName } = useParams();

  const postId = post?._id;

  const handleNavigateToPost = () => {
    navigate(`/community/${communityName}/reported-post`, {
      state: { postId },
    });
  };

  return (
    <div
      className="flex items-center gap-4 cursor-pointer p-3"
      onClick={handleNavigateToPost}
    >
      <div className="flex flex-col">
        <div className="flex">
          {reportedBy.slice(0, 3).map((user) => (
            <img
              key={user._id}
              className="w-8 rounded-full border-2 border-white flex-shrink-0"
              src={user.avatar}
              alt="user avatar"
            />
          ))}
          {reportedBy.length > 3 && (
            <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-gray-300">
              <span className="text-xs font-bold text-gray-800">
                +{reportedBy.length - 3}
              </span>
            </div>
          )}
          <div className="ml-4">
            <span className="text-sm">{reportedBy[0].name} </span>
            {reportedBy.length > 1 && (
              <span className="text-xs text-gray-600">
                and {reportedBy.length - 1} others reported this
              </span>
            )}
            <span className="text-xs flex items-center gap-1 text-gray-600">
              <IoTimerOutline />
              {reportDate}
            </span>
          </div>
        </div>
        <div className="text-sm text-red-500 font-semibold mt-2">
          <span className="font-semibold">Reason:</span> {reportReason}
        </div>
      </div>
    </div>
  );
};

export default ReportedPost;
