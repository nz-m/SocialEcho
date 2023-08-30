import { useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinCommunityAndFetchData } from "../../redux/actions/communityActions";
import { IoIosPeople } from "react-icons/io";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";

const JoinModal = memo(({ show, onClose, community }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.auth?.userData);

  const cancelButtonRef = useRef(null);

  const joinCommunityHandler = useCallback(
    async (communityName) => {
      try {
        setLoading(true);
        await dispatch(joinCommunityAndFetchData(communityName, userData));
      } finally {
        setLoading(false);
        onClose();
      }
    },
    [dispatch, userData, onClose]
  );

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={cancelButtonRef}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center gap-2 text-xl font-medium leading-6 text-primary"
                >
                  <IoIosPeople className="text-base text-primary md:text-xl" />
                  <div className="relative">
                    {community.name}
                    <p className="absolute -right-4 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {community.members.length}
                    </p>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-center text-sm text-gray-700 md:text-base">
                    Are you sure you want to join this community? You can always
                    leave later.
                  </p>
                </div>

                <div className="flex flex-col gap-2 px-4 py-3 sm:flex sm:px-6 md:flex-row md:gap-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="button"
                    className={`inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                      loading
                        ? "cursor-not-allowed bg-blue-500 text-white"
                        : "border-transparent bg-blue-500 text-white hover:bg-blue-600"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                    onClick={() => joinCommunityHandler(community.name)}
                  >
                    {loading ? (
                      <LoadingSpinner loadingText={"Joining..."} />
                    ) : (
                      <span>Join</span>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default JoinModal;
