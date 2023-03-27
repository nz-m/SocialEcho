import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUperror = useSelector((state) => state.auth.signUperror);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    // file type & size validation
    if (
      e.target.files[0] &&
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg" &&
      e.target.files[0].size > 10 * 1024 * 1024
    ) {
      alert("Please upload a valid image file (jpeg, jpg, png) less than 10MB");
      // Reset the file input value
      e.target.value = null;
    } else {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("role", "general");

    dispatch(signUpAction(formData, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account{" "}
          </h2>
          {signUperror &&
            Array.isArray(signUperror) &&
            signUperror.map((err, i) => (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4
                    text - center "
                role="alert"
                key={i}
              >
                <strong className="font-bold"> Error! </strong>
                <span
                  className="block sm:inline
                    ml - 2 mr - 2 "
                >
                  {err}{" "}
                </span>{" "}
              </div>
            ))}{" "}
        </div>{" "}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name{" "}
              </label>{" "}
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
              />{" "}
            </div>{" "}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address{" "}
              </label>{" "}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />{" "}
            </div>{" "}
            <div>
              <label htmlFor="password" className="sr-only">
                Password{" "}
              </label>{" "}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo -500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />{" "}
            </div>{" "}
            <div>
              <label htmlFor="avatar" className="sr-only">
                Avatar{" "}
              </label>{" "}
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo -500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Avatar"
                onChange={handleAvatarChange}
                required
              />{" "}
            </div>{" "}
          </div>{" "}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up{" "}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account ?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default SignupForm;
