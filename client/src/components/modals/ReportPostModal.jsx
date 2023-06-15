import { useState } from "react";
import { reportPostAction } from "../../redux/actions/communityActions";
import { useDispatch } from "react-redux";

import { Dialog } from "@headlessui/react";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";

const ReportPostModal = ({
  isOpen,
  onClose,
  postId,
  communityId,
  setReportedPost,
}) => {
  const [reportReason, setReportReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleReportSubmit = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        reportPostAction({
          postId,
          reportReason,
          communityId,
        })
      );
      setIsLoading(false);
      setReportedPost(true);
      onClose();
    } catch (error) {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block align-middle bg-white rounded-md text-left shadow-xl transform transition-all w-full mx-4 md:max-w-lg">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 p-4"
          >
            Report Post
          </Dialog.Title>

          <div className="p-4">
            <label
              htmlFor="report-reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for report
            </label>
            <div className="mt-1">
              <textarea
                name="report-reason"
                className="shadow-sm block w-full sm:text-sm rounded-md h-24 resize-none p-3 focus:outline-none focus:border"
                id="report-reason"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end p-4">
            <button
              disabled={isLoading || !reportReason}
              type="button"
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isLoading || !reportReason
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary border-transparent hover:bg-blue-600 focus-visible:ring-blue-500"
              }`}
              onClick={handleReportSubmit}
            >
              {isLoading ? (
                <ButtonLoadingSpinner loadingText={"Reporting..."} />
              ) : (
                "Report"
              )}
            </button>

            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ReportPostModal;
