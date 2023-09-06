import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  getUserAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import { FiUser, FiMapPin, FiEdit } from "react-icons/fi";

const suggestedInterests = [
  "🎨 Art",
  "📚 Books",
  "💼 Business",
  "🚗 Cars",
  "📖 Comics",
  "🌍 Culture",
  "✏️ Design",
  "🍽️ Food",
  "🎮 Gaming",
  "🎶 Music",
  "🏋️ Fitness",
  "🏞️ Travel",
  "🎯 Sports",
  "🎬 Movies",
  "📺 TV Shows",
  "📷 Photography",
  "💻 Technology",
  "🧘‍♀️ Yoga",
  "🌱 Sustainability",
  "📝 Writing",
];

const ProfileUpdateModal = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [interests, setInterests] = useState(
    user.interests ? user.interests : ""
  );

  const handleUpdateProfile = async () => {
    setIsUpdating(true);

    const formData = {
      bio,
      location,
      interests,
    };

    await dispatch(updateUserAction(user._id, formData));
    await dispatch(getUserAction(user._id));
    setBio("");
    setLocation("");
    setInterests("");
    setIsUpdating(false);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 text-center sm:block sm:p-0 md:pb-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle md:max-w-xl">
              <div className="w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Profile
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-gray-600" />
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                    </div>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-b border-gray-300 p-2 outline-none"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="text-gray-600" />
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                    </div>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-b border-gray-300 p-2 outline-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <FiEdit className="text-gray-600" />
                      <label className="block text-sm font-medium text-gray-700">
                        Interests (Separated by comma)
                      </label>
                    </div>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-b border-gray-300 p-2 outline-none"
                      value={interests}
                      onChange={(e) => {
                        if (e.target.value.length <= 50) {
                          setInterests(e.target.value);
                        }
                      }}
                      maxLength={50}
                    />

                    <div className="mt-4 h-20 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {suggestedInterests.map((interest, index) => (
                          <button
                            key={index}
                            type="button"
                            disabled={isUpdating || interests.length >= 50}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() =>
                              setInterests(
                                interests === ""
                                  ? interest
                                  : interests + ", " + interest
                              )
                            }
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  disabled={isUpdating}
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                    isUpdating
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  }`}
                  onClick={handleUpdateProfile}
                >
                  {isUpdating ? (
                    <ButtonLoadingSpinner loadingText={"Updating..."} />
                  ) : (
                    <span>Update</span>
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileUpdateModal;
