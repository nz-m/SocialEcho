import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../redux/actions/postActions";
import { useSelector } from "react-redux";

const PostForm = () => {
  const community = useSelector((state) => state.community?.communityData);

  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  if (!community) return null;

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const allowedFileTypes = /^image\/|video\//;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      allowedFileTypes.test(selectedFile.type) &&
      selectedFile.size <= 50 * 1024 * 1024 // 50MB
    ) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image or video file under 50MB.");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error || loading) return;

    if (!content && !file) {
      setError("Please enter a message or select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("communityId", community._id);
    formData.append("file", file);
    setLoading(true);

    try {
      await dispatch(createPostAction(formData));
      setContent("");
      setFile(null);
      event.target.reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 shadow-xl shadow-[#F3F8FF]"
    >
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Share something with your community:
        </label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={handleContentChange}
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
        disabled={loading || (!content && !file)}
        style={{ display: content || file ? "block" : "none" }}
      >
        {loading ? "Loading..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
