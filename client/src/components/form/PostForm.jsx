import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAction,
  clearCreatePostFail,
} from "../../redux/actions/postActions";
import InappropriatePostModal from "../modals/InappropriatePostModal";
import TopicConflictModal from "../modals/TopicConflictModal";
import EligibilityDetectionFailModal from "../modals/EligibilityDetectionFailModal";

const PostForm = ({ communityId, communityName }) => {
  const dispatch = useDispatch();
  const [showInappropriateContentModal, setShowInappropriateContentModal] =
    useState(false);
  const [showTopicConflictModal, setShowTopicConflictModal] = useState(false);
  const [
    showEligibilityDetectionFailModal,
    setShowEligibilityDetectionFailModal,
  ] = useState(false);

  const [formData, setFormData] = useState({
    content: "",
    file: null,
    error: "",
    loading: false,
  });

  const { isPostInappropriate, postCategory, confirmationToken } = useSelector(
    (state) => ({
      isPostInappropriate: state.posts?.isPostInappropriate,
      postCategory: state.posts?.postCategory,
      confirmationToken: state.posts?.confirmationToken,
    })
  );

  const handleContentChange = (event) => {
    setFormData({
      ...formData,
      content: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      selectedFile.size <= 50 * 1024 * 1024 // 50MB
    ) {
      setFormData({
        ...formData,
        file: selectedFile,
        error: "",
      });
    } else {
      setFormData({
        ...formData,
        file: null,
        error: "Please select an image or video file under 50MB.",
      });
    }
  };

  useEffect(() => {
    if (isPostInappropriate) setShowInappropriateContentModal(true);
    if (postCategory) setShowTopicConflictModal(true);
    if (confirmationToken) setShowEligibilityDetectionFailModal(true);
  }, [isPostInappropriate, postCategory, confirmationToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { content, file, loading } = formData;
    if (loading) return;

    if (!content && !file) {
      setFormData({
        ...formData,
        error: "Please enter a message or select a file.",
      });
      return;
    }

    const newPost = new FormData();
    newPost.append("content", content);
    newPost.append("communityId", communityId);
    newPost.append("communityName", communityName);
    newPost.append("file", file);

    setFormData({
      ...formData,
      loading: true,
    });

    try {
      await dispatch(createPostAction(newPost));
      setFormData({
        content: "",
        file: null,
        error: "",
        loading: false,
      });
      event.target.reset();
    } catch (error) {
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      file: null,
      error: "",
    });
  };

  return (
    <>
      <InappropriatePostModal
        closeInappropriateContentModal={() => {
          setShowInappropriateContentModal(false);
          dispatch(clearCreatePostFail());
        }}
        showInappropriateContentModal={showInappropriateContentModal}
        contentType={"post"}
      />

      <TopicConflictModal
        closeTopicConflictModal={() => {
          setShowTopicConflictModal(false);
          dispatch(clearCreatePostFail());
        }}
        showTopicConflictModal={showTopicConflictModal}
        communityName={postCategory?.community}
        recommendedCommunity={postCategory?.recommendedCommunity}
      />

      <EligibilityDetectionFailModal
        closeEligibilityDetectionFailModal={() => {
          setShowEligibilityDetectionFailModal(false);
          dispatch(clearCreatePostFail());
        }}
        showEligibilityDetectionFailModal={showEligibilityDetectionFailModal}
        confirmationToken={confirmationToken}
      />

      <form onSubmit={handleSubmit} className="border-b bg-white p-6">
        <div className="mb-4">
          <label
            htmlFor="content"
            className="mb-2 block font-bold text-gray-700"
          >
            Share something with your community:
          </label>
          <textarea
            className="w-full resize-none rounded-md border p-2"
            name="content"
            id="content"
            value={formData.content}
            onChange={handleContentChange}
            minLength={10}
            maxLength={3000}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="file"
            className="mx-auto mt-6 flex cursor-pointer items-center rounded-lg border-2 border-dashed bg-white px-3 py-3 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <h2 className="mx-3 text-gray-400">Photo / Video</h2>
            <input
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {formData.file && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-500">{formData.file.name}</p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {formData.error && <p className="text-red-500">{formData.error}</p>}
        </div>

        <button
          className={`rounded bg-primary px-4 py-1 text-sm text-white hover:bg-blue-700 ${
            formData.loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          type="submit"
          disabled={formData.loading || (!formData.content && !formData.file)}
          style={{
            display: formData.content || formData.file ? "block" : "none",
          }}
        >
          {formData.loading ? "Processing..." : "Create post"}
        </button>
      </form>
    </>
  );
};

export default PostForm;
