import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/adminActions";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";

const Tab = ({ activeTab, handleTabClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logoutAction()).then(() => {
      navigate("/admin/signin");
    });
    setLoggingOut(false);
  };

  return (
    <div className="border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
        <li className="mr-2">
          <span
            className={`cursor-pointer inline-flex p-4 border-b-2 rounded-t-lg ${
              activeTab === "logs"
                ? "text-blue-600 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            }`}
            onClick={() => handleTabClick("logs")}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Logs
          </span>
        </li>
        <li className="mr-2">
          <span
            className={`cursor-pointer inline-flex p-4 border-b-2 rounded-t-lg ${
              activeTab === "settings"
                ? "text-blue-600 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            Settings
          </span>
        </li>

        <li className="mr-2">
          <span
            className={`cursor-pointer inline-flex p-4 border-b-2 rounded-t-lg ${
              activeTab === "Community Management"
                ? "text-blue-600 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            }
                `}
            onClick={() => handleTabClick("Community Management")}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-4.293a1 1 0 011.414-1.414L10 12.586l1.293-1.293a1 1 0 011.414 1.414L11.414 14l1.293 1.293a1 1 0 01-1.414 1.414L10 15.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 14l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Community Management
          </span>
        </li>

        <li className="mr-2">
          <span
            className={`cursor-pointer inline-flex p-4 border-b-2 rounded-t-lg ${
              activeTab === "logout"
                ? "text-blue-600 border-blue-600"
                : "border-transparent hover:text-red-600 hover:border-red-600"
            }`}
            onClick={handleLogout}
          >
            <svg
              aria-hidden="true"
              className={`w-5 h-5 mr-2 text-gray-400 ${
                activeTab === "logout"
                  ? "group-hover:text-gray-500"
                  : "group-hover:text-red-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={`${
                activeTab === "logout"
                  ? "group-hover:text-gray-500"
                  : "group-hover:text-red-600"
              }`}
            >
              {loggingOut ? (
                <ButtonLoadingSpinner loadingText={"Logging out..."} />
              ) : (
                "Logout"
              )}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
