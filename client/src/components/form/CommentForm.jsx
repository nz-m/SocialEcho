import { useState } from "react";
import {
  addCommentAction,
  getPostAction,
  getComPostsAction,
  getSelfPostAction,
} from "../../redux/actions/postActions";
import { useDispatch } from "react-redux";

const CommentForm = ({ communityId, postId }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      body,
      post: postId,
    };

    try {
      setIsLoading(true);
      await dispatch(addCommentAction(postId, newComment));
      await dispatch(getPostAction(postId));
      await dispatch(getSelfPostAction(postId));

      setIsLoading(false);
      setBody("");

      await dispatch(getComPostsAction(communityId));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="write a comment"
          />
        </div>
        <div className="flex justify-end">
          <button
            className={`${
              isLoading
                ? "bg-gray-500"
                : "rounded-md py-1 px-2 text-sm font-semibold group transition duration-300 text-primary border border-dashed border-blue-500"
            } hover:bg-primary  py-2 px-4 rounded hover:text-white`}
            type="submit"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Loading..." : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
