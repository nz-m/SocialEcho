import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPostAction,
  getPostsAction,
  getComPostsAction,
} from "../../actions/postActions";
import { useSelector } from "react-redux";

const PostForm = () => {
  const community = useSelector((state) => state.community.communityData);
  const user = useSelector((state) => state.auth.userData);
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  if (!community || !user) return null;

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("body", body);
    formData.append("community", community._id);
    formData.append("user", user.id);
    formData.append("file", file);
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
      </div>

      <button className="bg-blue-500 hover:bg-blue-600 btn-sm text-white font-bold rounded-sm">
        Post
      </button>
    </form>
  );
};

export default PostForm;
