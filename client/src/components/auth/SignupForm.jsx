import React, { useState } from "react";
import axios from "axios";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.files[0]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("avatar", avatar);

    axios
      .post("/users", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          // onChange={handleAvatarChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
