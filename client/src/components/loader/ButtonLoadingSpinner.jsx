const ButtonLoadingSpinner = ({ loadingText }) => {
  return (
    <div className="flex justify-center items-center">
      <span className="mr-2">
        {loadingText ? loadingText : "Just a moment..."}
      </span>
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ButtonLoadingSpinner;
