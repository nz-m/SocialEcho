import React from "react";
import { useNavigate } from "react-router";
import warning from "../assets/warning.png";

const SigninWarning = () => {
  const navigate = useNavigate();
  const handleWarningClose = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-1">
        <div
          className="max-w-md mx-auto px-4 py-8 bg-amber-50
            shadow-lg rounded-md border border-yellow-500 flex flex-col items-center relative"
        >
          <button
            className="absolute top-0 right-0 mr-4 mt-4 text-gray-500 hover:text-gray-700"
            onClick={handleWarningClose}
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M13.414 12l6.293-6.293a1 1 0 00-1.414-1.414L12 10.586 5.707 4.293a1 1 0 00-1.414 1.414L10.586 12l-6.293 6.293a1 1 0 001.414 1.414L12 13.414l6.293 6.293a1 1 0 001.414-1.414L13.414 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <img src={warning} alt="warning" className="w-16 h-16 mb-4" />

          <h1 className="text-lg font-bold text-amber-500 mb-4 text-center">
            Warning: Suspicious Login Attempt Detected
          </h1>
          <p className="text-gray-600 text-center">
            Your account security is important to us. We've detected an unusual
            login attempt from an unfamiliar location or device. To ensure the
            security of your account,{" "}
            <strong>
              we've sent an email to your registered email address.
            </strong>{" "}
            Please follow the instructions in the email to verify your identity
            and regain access to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninWarning;
