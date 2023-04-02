import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsAction } from "../../redux/actions/postActions";
import { useParams } from "react-router-dom";

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
    <div className="w-3/12 h-screen bg-white sticky top-0">
      {currentComments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
          {currentComments.map((comment) => (
            <div key={comment._id} className="flex items-start mb-4">
              <img
                src={comment.user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="flex items-center mb-1">
                  <h3 className="mr-2 font-semibold">{comment.user.name}</h3>
                  <span className="text-gray-500 text-sm">
                    {comment.createdAt}
                  </span>
                </div>
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
          {currentComments.length < comments.length && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSidebar;
