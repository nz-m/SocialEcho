import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const VerifyEmail = ({ email }) => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = () => {
    const verificationLink = `${BASE_URL}/verify?code=${code}&email=${email}`;

    axios
      .get(verificationLink)
      .then((res) => {
        if (res.status === 200) {
          navigate("/email-verified");
        }
      })
      .catch((err) => {
        setError("Invalid code, please try again.");
      });

    setError("Invalid code, please try again.");
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Verify your email address</h2>
          <p className="mb-4">
            A verification code was sent to your email address. Please either
            <span className="font-bold"> follow </span>
            the link in the email or
            <span className="font-bold"> enter </span>
            the code below.
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Verification code"
              className="border-2 border-gray-200 rounded-lg p-2 w-full"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            onClick={handleVerify}
          >
            Verify
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 ml-4 rounded-lg"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
