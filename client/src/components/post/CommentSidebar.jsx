import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsAction } from "../../redux/actions/postActions";
import { Link, useParams } from "react-router-dom";

const CommentSidebar = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);

  const currentPage = 1;
  const [commentsPerPage, setCommentsPerPage] = useState(10);

  const comments = useSelector((state) =>
    state.posts?.comments.filter((comment) => comment.post === postId)
  );

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  useEffect(() => {
    if (userData) {
      dispatch(getCommentsAction(postId));
    }
  }, [userData, dispatch, postId]);

  const handleLoadMore = () => {
    setCommentsPerPage(commentsPerPage + 10);
  };

  return (
    <div className="w-3/12 h-[86vh] bg-white sticky top-20 right-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg overflow-y-auto">
      {currentComments.length > 0 && (
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
          {currentComments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col my-4 bg-white border border-dashed border-slate-200 px-3 py-3 rounded-lg"
            >
              <div className="flex">
                <img
                  src={comment.user.avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full mr-2"
                />

                <div className="-mt-1">
                  <Link
                    to={`/user/${comment.user._id}`}
                    className="text-primary font-semibold"
                  >
                    {comment.user.name}
                  </Link>
                  <p className="text-gray-500 text-xs">{comment.createdAt}</p>
                </div>
              </div>

              <p className="text-lg">{comment.body}</p>
            </div>
          ))}
          {currentComments.length < comments.length && (
            <button
              className="text-primary border border-dashed border-blue-500
            hover:bg-primary 
             rounded-md py-1 px-2 text-sm font-semibold group transition duration-300"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSidebar;
