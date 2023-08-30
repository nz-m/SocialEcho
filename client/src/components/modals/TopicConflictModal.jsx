const TopicConflictModal = ({
  communityName,
  closeTopicConflictModal,
  showTopicConflictModal,
  recommendedCommunity,
}) => {
  const handleClose = () => {
    if (showTopicConflictModal) {
      closeTopicConflictModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        showTopicConflictModal ? "opacity-100 z-50" : "opacity-0 hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-0"></div>
      <div className="bg-white rounded-md shadow-md p-8 w-full md:w-1/2 md:mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Message</h2>
          <p className="text-gray-600 mb-6 leading-6">
            Hi there! We noticed that your post in the{" "}
            <strong>{communityName}</strong> community may not be the best fit
            for that community. However, we think that your post could be a
            great fit for the <strong>{recommendedCommunity}</strong> community!
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            onClick={handleClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicConflictModal;
