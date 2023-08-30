import { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import {
  getComMembersAction,
  unbanUserAction,
} from "../../redux/actions/communityActions";
const UnbanUserModal = ({ show, onClose, userId, communityName }) => {
  const [unbanning, setUnbanning] = useState(false);
  const dispatch = useDispatch();

  const unbanHandler = async () => {
    setUnbanning(true);
    await dispatch(unbanUserAction(communityName, userId));
    await dispatch(getComMembersAction(communityName));
    setUnbanning(false);
    onClose();
  };
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${show ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-opacity ${show ? "" : "hidden"}`}
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-md px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Unban User
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  The user will be unbanned from this community and will be able
                  to join again. Are you sure you want to unban this user?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 flex justify-center space-x-2">
            <button
              disabled={unbanning}
              onClick={onClose}
              className="w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Cancel
            </button>
            <button
              disabled={unbanning}
              onClick={unbanHandler}
              className="w-1/2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              {unbanning ? (
                <LoadingSpinner loadingText={"unbanning..."} />
              ) : (
                <span>Unban User</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnbanUserModal;
