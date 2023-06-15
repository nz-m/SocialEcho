import { useState } from "react";
import { Link } from "react-router-dom";

const CommentSidebar = ({ comments }) => {
  const currentPage = 1;
  const [commentsPerPage, setCommentsPerPage] = useState(10);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleLoadMore = () => {
    setCommentsPerPage(commentsPerPage + 10);
  };

  return (
    <div className="col-span-1 bg-white sticky top-20 h-[85vh] p-5 rounded-md border overflow-y-auto">
      {currentComments.length > 0 && (
        <div>
          <h2 className="font-semibold mb-4 text-center py-2 border-b-2">
            Recent Comments
          </h2>
          {currentComments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col bg-white p-2 border-b w-full"
            >
              <div className="flex gap-1">
                <img
                  src={comment.user.avatar}
                  alt="User Avatar"
                  className="rounded-full overflow-hidden w-[30px] h-[30px] object-cover"
                />

                <div className="flex flex-col">
                  <span className="text-md font-semibold hover:underline">
                    <Link to={`/user/${comment.user._id}`}>
                      {comment.user.name}
                    </Link>
                  </span>
                  <p className="text-gray-500 text-xs ml-1">
                    {comment.createdAt}
                  </p>
                </div>
              </div>
              <p className="text-sm mt-2 whitespace-normal break-words">
                {comment.content}
              </p>
            </div>
          ))}

          {currentComments.length < comments.length && (
            <button
              className="text-primary text-sm font-semibold mt-3 w-full"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      )}

      {currentComments.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg font-semibold mb-4">No Comments Yet</p>
        </div>
      )}
    </div>
  );
};

export default CommentSidebar;
