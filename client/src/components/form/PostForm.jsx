import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPostAction,
  getPostsAction,
  getComPostsAction,
} from "../../redux/actions/postActions";
import { useSelector } from "react-redux";

const PostForm = () => {
  const community = useSelector((state) => state.community.communityData);
  const user = useSelector((state) => state.auth.userData);
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  if (!community || !user) return null;

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/gif" ||
        selectedFile.type === "image/webp" ||
        selectedFile.type === "video/mpeg" ||
        selectedFile.type === "video/mp4" ||
        selectedFile.type === "video/avi") &&
      selectedFile.size <= 50 * 1024 * 1024 // 50MB
    ) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError(
        "Invalid file type or size. Please select an image or video file under 50MB."
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error || loading) return;

    if (!body && !file) {
      setError("Please enter a message or select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("body", body);
    formData.append("community", community._id);
    formData.append("user", user.id);
    formData.append("file", file);
    setLoading(true);

    dispatch(
      createPostAction(formData, () => {
        dispatch(
          getPostsAction(user.id, () => {
            dispatch(getComPostsAction(community._id));
          })
        );
        setBody("");
        setFile(null);
        event.target.reset();
        setLoading(false);
      })
    );
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Share something with your community:
        </label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={handleBodyChange}
          className="resize-none border rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
          Image/Video:
        </label>
        <input
          name="file"
          type="file"
          id="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          className="border rounded-md p-2 w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={loading || (!body && !file)} // disable button when both fields are empty
        style={{ display: body || file ? "block" : "none" }} // hide button when both fields are empty
      >
        {loading ? "Loading..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
