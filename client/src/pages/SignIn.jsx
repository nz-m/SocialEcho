import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearMessage } from "../redux/actions/authActions";
import { AiFillGithub } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/SocialEcho.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingText("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);
    await dispatch(signInAction(formData, navigate));
    setLoading(false);
    clearTimeout(timeout);
  };

  const signInError = useSelector((state) => state.auth?.signInError);
  const successMessage = useSelector((state) => state.auth?.successMessage);

  const handleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6">
        <form className="w-full max-w-md">
          <div className="mx-auto flex justify-center">
            <img className="h-7 w-auto sm:h-8" src={Logo} alt="" />
          </div>
          {signInError && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{signInError}</span>
              </div>
              <button
                className="font-bold text-red-700"
                onClick={handleClearMessage}
              >
                <RxCross1 className="h-3 w-3" />
              </button>
            </div>
          )}
          {successMessage && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{successMessage}</span>
              </div>
              <button
                className="font-bold text-green-700"
                onClick={handleClearMessage}
              >
                <RxCross1 className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center">
            <Link
              to={"/signin"}
              className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium text-gray-800 "
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="w-1/3 border-b border-gray-400 pb-4 text-center font-medium text-gray-500 "
            >
              Sign Up
            </Link>
          </div>

          <div className="relative mt-6 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300"
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
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Email address"
              required
              autoComplete="off"
            />
          </div>
          <div className="relative mt-4 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300"
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
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={loadingText} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        <span className="flex items-center justify-center py-4 text-sm text-gray-600 ">
          <a
            href="https://github.com/nz-m/SocialEcho"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-500"
          >
            <AiFillGithub className="mr-2 h-5 w-5" />
            <span>GitHub</span>
          </a>
          <Link
            to="/admin"
            className="ml-8 flex items-center hover:text-blue-500"
          >
            <MdOutlineAdminPanelSettings className="mr-2 h-5 w-5" />
            <span>Admin</span>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
