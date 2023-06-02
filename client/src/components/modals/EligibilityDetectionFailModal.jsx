import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  confirmPostAction,
  rejectPostAction,
} from "../../redux/actions/postActions";

const EligibilityDetectionFailModal = ({
  closeEligibilityDetectionFailModal,
  showEligibilityDetectionFailModal,
  confirmationToken,
}) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDiscard = async () => {
    setIsProcessing(true);
    await dispatch(rejectPostAction(confirmationToken));
    setIsProcessing(false);
    closeEligibilityDetectionFailModal();
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    await dispatch(confirmPostAction(confirmationToken));
    setIsProcessing(false);
    closeEligibilityDetectionFailModal();
  };

  const modalClass = showEligibilityDetectionFailModal
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "hidden";

  return (
    <div className={modalClass}>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="bg-white rounded-md shadow-sm p-8 max-w-md mx-auto z-10">
        <h2 className="text-lg font-bold mb-4">
          Unable to Determine Post Eligibility
        </h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience, but our system couldn't determine
          the eligibility of your post for this community. While it may not meet
          the specific criteria, we acknowledge that it could still be relevant.
          You are welcome to proceed with posting it if you believe it is
          relevant to this community. However, please be aware that community
          moderators reserve the right to remove posts that do not align well
          with the community guidelines. Continuous violations may result in a
          ban from this community. Thank you for your understanding.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400  text-gray-800  px-2 py-1 rounded mr-4 focus:outline-none focus:shadow-outline"
            onClick={handleDiscard}
            disabled={isProcessing}
          >
            {isProcessing ? "Discarding..." : "Discard"}
          </button>
          <button
            className={`bg-primary hover:bg-blue-600 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleProcess}
            disabled={isProcessing}
          >
            {isProcessing ? "Posting..." : "Post Anyway"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EligibilityDetectionFailModal;
