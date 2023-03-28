import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../redux/actions/authActions";
import LoadingSpinner from "../spinner/LoadingSpinner";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await dispatch(signInAction(formData, navigate));
    setLoading(false);
  };

  const signInerror = useSelector((state) => state.auth?.signInerror);
  const successMessage = useSelector((state) => state.auth?.successMessage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {signInerror && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{signInerror}</span>
          </div>
        )}

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              cursor={loading ? "not-allowed" : "pointer"}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v1.586l3.707-3.707a1 1 0 011.414 1.414L12.414 7H14a7 7 0 017 7v2a1 1 0 01-2 0v-2a5 5 0 00-5-5H12.414l2.293-2.293a1 1 0 011.414 1.414L12 9.586V11a1 1 0 01-2 0V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {loading ? (
                <LoadingSpinner loadingText={"Signing In..."} />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account ?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
