import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = ({ onSuccess, onError, buttonText = "Continue with Google", className = "" }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Get the ID token from the response
        const idToken = response.access_token;
        
        // Call the backend with the token
        const backendResponse = await fetch('/api/users/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        });

        const data = await backendResponse.json();

        if (backendResponse.ok) {
          onSuccess(data);
        } else {
          onError(data.message || 'Google authentication failed');
        }
      } catch (error) {
        console.error('Google auth error:', error);
        onError('Failed to authenticate with Google');
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      onError('Google login failed. Please try again.');
    },
  });

  return (
    <button
      onClick={() => login()}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${className}`}
      type="button"
    >
      <FcGoogle className="w-5 h-5" />
      {buttonText}
    </button>
  );
};

export default GoogleSignIn;
