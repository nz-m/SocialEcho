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
      <div className="bg-white rounded-md shadow-md p-8 w-2/4 mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Message</h2>
          <p className="text-gray-600 mb-6 leading-6">
            Hi there! We noticed that your post in the{" "}
            <strong>{communityName}</strong> community may not be the best fit
            for that community. However, we think that your post could be a
            great fit for the <strong>{recommendedCommunity}</strong> community!
            Here are a few tips to help you improve your post and make it more
            successful:
          </p>
          <ul className="text-left mb-6 leading-6">
            <li className="mb-2">
              Consider adding more detail or context to your post to help
              readers understand your perspective.
            </li>
            <li className="mb-2">
              Try to focus on the most important aspects of your post, and avoid
              including too much information that may be distracting.
            </li>
            <li className="mb-2">
              Consider using more descriptive titles or tags to help readers
              find your post more easily.
            </li>
          </ul>
          <p className="text-gray-600 mb-6 leading-6">
            We appreciate your effort in creating this post, and we hope that
            these tips will help you improve it and make it more successful in
            the future. Thanks for being a part of our community!
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
