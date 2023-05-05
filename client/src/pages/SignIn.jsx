import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../redux/actions/authActions";
import LoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

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
    <section className="bg-[#F6F7FA]">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md">
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
            Sign In
          </h1>
          {signInerror && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6"
              role="alert"
            >
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{signInerror}</span>
            </div>
          )}
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-6"
              role="alert"
            >
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
            />
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {loading ? (
                <LoadingSpinner loadingText={"Signing in..."} />
              ) : (
                "Sign in"
              )}
            </button>

            <div className="mt-6 text-center ">
              <Link
                to="/signup"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <span className="flex items-center justify-center py-4 text-gray-600 text-sm">
        <a
          href="https://github.com/nz-m/SocialEcho"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-500"
        >
          <AiFillGithub className="w-5 h-5 mr-2" />
          <span>GitHub</span>
        </a>
        <Link
          to="/admin"
          className="flex items-center ml-8 hover:text-blue-500"
        >
          <MdOutlineAdminPanelSettings className="w-5 h-5 mr-2" />
          <span>Admin</span>
        </Link>
      </span>
    </section>
  );
};

export default SignIn;
