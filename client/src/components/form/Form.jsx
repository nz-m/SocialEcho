import React from "react";
import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
    };
    axios
      .post("http://localhost:3001/posts", post)
      .then((res) => {
        // reset the form and reload the page
        setTitle("");
        setDescription("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
     
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
