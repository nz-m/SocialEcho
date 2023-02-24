import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../actions/postActions";
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
    dispatch(createPostAction(formData));
    setBody("");
    setFile(null);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Share something with your community:</label>
      <textarea
        name="body"
        id="body"
        value={body}
        onChange={handleBodyChange}
      />

      <label htmlFor="file">Image/Video:</label>
      <input
        name="file"
        type="file"
        id="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />

      <button className="btn-sm btn-primary" type="submit">
        Post
      </button>
    </form>
  );
};

export default PostForm;
