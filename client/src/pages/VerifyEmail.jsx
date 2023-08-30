import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import LoadingSpinner from "../components/loader/ButtonLoadingSpinner";

const BASE_URL = process.env.REACT_APP_API_URL;

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const codeFromUrl = searchParams.get("code");
  const emailFromUrl = searchParams.get("email");
  const email = location.state ? location.state : emailFromUrl;

  const [code, setCode] = useState(codeFromUrl ? codeFromUrl : "");
  const [error, setError] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = useCallback(() => {
    setLoading(true);
    const verificationLink = `${BASE_URL}/auth/verify?code=${code}&email=${email}`;
    axios
      .get(verificationLink)
      .then((res) => {
        if (res.status === 200) {
          navigate("/email-verified");
          setCode("");
          setError("");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(
          err.response.data.message || "Invalid code, please try again."
        );

        setLoading(false);
      });
  }, [code, email, navigate, setLoading, setError]);

  useEffect(() => {
    // Automatically trigger handleVerify if both code and email are present in the URL
    if (codeFromUrl && emailFromUrl) {
      handleVerify();
    }
  }, [codeFromUrl, emailFromUrl, handleVerify]);

  if (error === "Email is already verified") {
    navigate("/signin");
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Verify your email address</h2>

          {!codeFromUrl && !emailFromUrl && (
            <p className="mb-4">
              A verification code was sent to your email address. Please either
              <span className="font-bold"> follow </span>
              the link in the email or
              <span className="font-bold"> enter </span>
              the code below.
            </p>
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Verification code"
              className="w-full rounded-lg border-2 border-gray-200 p-2"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <button
            disabled={loading}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleVerify}
          >
            {loading ? (
              <LoadingSpinner loadingText={"Verifying..."} />
            ) : (
              "Verify"
            )}
          </button>
          <button
            className="ml-4 rounded-lg bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
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
