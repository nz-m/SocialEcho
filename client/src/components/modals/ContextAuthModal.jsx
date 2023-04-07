const ContextAuthModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsConsentGiven,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Context-Based Authentication
            </h2>
            <p className="mb-6 text-gray-600">
              To enhance the security of your account, we would like to provide
              context-based authentication. By opting in to this feature,
              certain information about your device and location, including your
              current location, device, browser info, and IP address, will be
              securely stored in our database, and will be used to verify your
              identity when you sign in from a new location or device. This
              information will be encrypted and will not be shared with any
              third party. Please note that email verification is required to
              enable this feature. Would you like to enable this feature?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsConsentGiven(false);
                  handleCloseModal();
                }}
                className="text-gray-500 mr-4 hover:text-gray-700 focus:outline-none"
              >
                No, thanks
              </button>
              <button
                onClick={() => {
                  setIsConsentGiven(true);
                  handleCloseModal();
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
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
