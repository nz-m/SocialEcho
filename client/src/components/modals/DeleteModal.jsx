import { Fragment, useRef, useState, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deletePostAction } from "../../redux/actions/postActions";
import LoadingSpinner from "../spinner/LoadingSpinner";
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
        className="relative z-10"
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 border border-dashed">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-base font-semibold mt-3 text-slate-800 text-center">
                          Are you sure you want to delete? <br /> This action
                           cannot be undo.
                        </p>
                   
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse justify-center gap-5 sm:px-6">
                  <button
                    type="button"
                    className="text-red-500 border border-dashed border-red-500
                    hover:bg-red-500 
                     rounded-md py-1 px-2 text-sm font-semibold hover:text-white transition duration-300"
                    onClick={deleteHandler}
                  >
                    {loading ? (
                      <LoadingSpinner loadingText="Deleting..." />
                    ) : (
                      "Delete"
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full border-dashed border justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm  hover:bg-slate-100 sm:mt-0 sm:w-auto"
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
