import { useNavigate } from "react-router";

const EmailVerifiedMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Congratulations!
          </h2>
          <p className="text-gray-600">
            Your email has been verified and your account has been created
            successfully.
          </p>
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default EmailVerifiedMessage;
