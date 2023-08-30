const ContextAuthModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsConsentGiven,
  isModerator,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Context-Based Authentication
            </h2>
            {isModerator ? (
              <p className="mb-6 text-gray-600">
                This feature is not available for moderators.
              </p>
            ) : (
              <p className="mb-6 text-gray-600">
                To enhance the security of your account, we offer context-based
                authentication. By enabling this feature, we will process
                certain information about your device and location, including
                your current location, device, browser info, and IP address.
                This information will be used to verify your identity when you
                sign in from a new location or device, and will be encrypted and
                kept confidential. Please note that email verification is
                required to enable this feature. Would you like to enable
                context-based authentication and enhance the security of your
                account?
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsConsentGiven(false);
                  handleCloseModal();
                }}
                className="text-gray-500 mr-4 hover:text-gray-900 focus:outline-none hover:underline"
              >
                {isModerator ? "Close" : "No, thanks"}
              </button>
              <button
                onClick={() => {
                  setIsConsentGiven(true);
                  handleCloseModal();
                }}
                className={`${
                  isModerator
                    ? "hidden"
                    : "bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                } text-white px-4 py-2 rounded-md`}
              >
                Yes, enable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContextAuthModal;
