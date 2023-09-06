import { Fragment, useRef, useState, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { deletePostAction } from "../../redux/actions/postActions";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import { useNavigate } from "react-router-dom";
const DeleteModal = memo(({ showModal, postId, onClose, prevPath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    await dispatch(deletePostAction(postId));
    navigate(prevPath ? prevPath : "/");
    setLoading(false);
    onClose();
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 border border-dashed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <p className="text-base font-semibold mt-3 text-slate-800 text-center">
                      Are you sure you want to delete? <br /> This action cannot
                      be undo.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse justify-center gap-5 sm:px-6">
                  <button
                    type="button"
                    className="text-red-500 border  border-red-500
                    hover:bg-red-500 
                     rounded-md py-1 px-2 text-sm w-full sm:w-auto font-semibold hover:text-white transition duration-300"
                    onClick={deleteHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingSpinner loadingText="Deleting..." />
                    ) : (
                      "Delete"
                    )}
                  </button>
                  <button
                    disabled={loading}
                    type="button"
                    className="mt-3 inline-flex w-full border-dashed border justify-center rounded-md bg-white px-3  py-2 text-sm font-semibold text-gray-500 shadow-sm  hover:bg-slate-100 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      onClose();
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

export default DeleteModal;
