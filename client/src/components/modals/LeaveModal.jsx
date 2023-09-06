import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import { leaveFetchData } from "../../redux/actions/communityActions";

const LeaveModal = ({ show, communityName, toggle }) => {
  const [leaving, setLeaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const leaveCommunityHandler = async () => {
    setLeaving(true);
    await dispatch(leaveFetchData(communityName));
    setLeaving(false);
    toggle();
    navigate("/");
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${show ? "" : "hidden"}`}>
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-opacity ${show ? "" : "hidden"}`}
          aria-hidden="true"
          onClick={toggle}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-headline"
              >
                Leave Community
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to leave this community?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center space-x-2 sm:mt-6">
            <button
              disabled={leaving}
              onClick={toggle}
              className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Cancel
            </button>
            <button
              disabled={leaving}
              onClick={leaveCommunityHandler}
              className="w-1/2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
            >
              {leaving ? (
                <LoadingSpinner loadingText={"Leaving..."} />
              ) : (
                <span>Leave</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
