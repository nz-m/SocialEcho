import { useState, useEffect } from "react";
import {
  addCommentAction,
  getPostAction,
  getComPostsAction,
  getOwnPostAction,
  clearCommentFailAction,
} from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import InappropriatePost from "../modals/InappropriatePostModal";

const CommentForm = ({ communityId, postId }) => {
  const dispatch = useDispatch();
  const [showInappropriateContentModal, setShowInappropriateContentModal] =
    useState(false);

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      content,
      postId,
    };
    try {
      setIsLoading(true);
      await dispatch(addCommentAction(postId, newComment));
      await dispatch(getPostAction(postId));
      await dispatch(getOwnPostAction(postId));

      setIsLoading(false);
      setContent("");

      await dispatch(getComPostsAction(communityId));
    } finally {
      setIsLoading(false);
    }
  };

  const isCommentInappropriate = useSelector(
    (state) => state.posts?.isCommentInappropriate
  );

  useEffect(() => {
    if (isCommentInappropriate) {
      setShowInappropriateContentModal(true);
    }
  }, [isCommentInappropriate]);

  return (
    <div>
      <InappropriatePost
        closeInappropriateContentModal={() => {
          setShowInappropriateContentModal(false);
          dispatch(clearCommentFailAction());
        }}
        showInappropriateContentModal={showInappropriateContentModal}
        contentType={"comment"}
      />

      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            required
            placeholder="Write a comment..."
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
