import React, { useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Fragment, useRef, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinCommunityAndFetchData } from "../../redux/actions/communityActions";

import LoadingSpinner from "../spinner/LoadingSpinner";

const JoinModal = memo(({ show, onClose, community }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth?.userData);

  const cancelButtonRef = useRef(null);

  const joinCommunityHandler = useCallback(
    async (communityName) => {
      setLoading(true);
      try {
        await dispatch(joinCommunityAndFetchData(communityName, userData));
        navigate(`/community/${communityName}`);
      } catch (error) {
        loading(false);
      } finally {
        setLoading(false);
        onClose();
      }
    },
    [dispatch, userData, navigate, onClose, loading]
  );

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Join Community : {community.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>
                      <span className="font-bold">Description:</span>{" "}
                      {community.description}
                    </p>
                    <p>
                      <span className="font-bold">Members:</span>{" "}
                      {community.members.length}
                    </p>

                    <p className="text-sm text-gray-500">
                      Are you sure you want to join this community? You can
                      always leave later.
                    </p>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onClose}
                      ref={cancelButtonRef}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={loading}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
    </>
  );
});

export default JoinModal;
