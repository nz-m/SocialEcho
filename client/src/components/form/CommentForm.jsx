import React from "react";
import { useState } from "react";
import {
  addCommentAction,
  getCommentsAction,
  getPostsAction,
  getComPostsAction,
} from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CommentForm = ({ communityId }) => {
  const dispatch = useDispatch();

  const { postId } = useParams();
  const userData = useSelector((state) => state.auth?.userData);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      body,
      user: userData._id,
      post: postId,
    };
    if (userData) {
      try {
        setIsLoading(true);
        await dispatch(addCommentAction(postId, newComment));
        await dispatch(getCommentsAction(postId));
        setIsLoading(false);
        setBody("");
        await dispatch(getPostsAction());
        await dispatch(getComPostsAction(communityId));
      } catch (error) {
        setIsLoading(false);
        // handle error
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button
            className={`${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white py-2 px-4 rounded hover:bg-blue-600`}
            type="submit"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
        >
          {isLoading ? "Loading..." : "Comment"}{" "}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
