import { Link } from "react-router-dom";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { useState } from "react";
import ProfileUpdateModal from "../modals/ProfileUpdateModal";
import Tooltip from "../shared/Tooltip";

const OwnProfileCard = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-md border bg-white p-6">
      <div
        className="flex cursor-pointer justify-end text-xl"
        onClick={handleOpenModal}
      >
        <Tooltip text="Edit profile">
          <CiEdit />
        </Tooltip>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <div className="">
            <img
              className="mr-4 h-28 w-28 rounded-full object-cover"
              src={user.avatar}
              alt="Profile"
            ></img>

            <ProfileUpdateModal
              user={user}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>

          <div>
            <h2 className="mt-5 text-center text-lg font-bold">{user.name}</h2>
            {user.bio ? (
              <p className="flex items-center justify-center gap-2 text-gray-600">
                <GrContactInfo className="text-gray-500" />
                {user.bio}
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 text-gray-400">
                <GrContactInfo className="text-gray-500" />
                Bio not added
              </p>
            )}
            <hr className="mt-3" />
          </div>
        </div>
      </div>
      <div className="my-3 flex flex-col justify-start">
        <p className="font-semibold">Location</p>
        {user.location ? (
          <p className="flex items-center gap-2 text-gray-700">
            <CiLocationOn className="font-semibold" />
            {user.location}
          </p>
        ) : (
          <p className="flex items-center gap-2 text-gray-400">
            <CiLocationOn className="text-lg font-semibold" />
            Location not added
          </p>
        )}
      </div>

      <div className="mt-4 h-20 overflow-y-auto">
        <h3 className="font-bold text-xl mb-2">Interests</h3>
        {user.interests ? (
          <div className="flex flex-wrap gap-2">
            {user.interests.split(",").map((interest, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {interest.trim()}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2">
            No interests have been set yet. Add some interests to let people
            know more about you.
          </p>
        )}
      </div>

      <span className="mt-3 flex flex-col items-center justify-center border-t">
        <Link
          className="mt-3 cursor-pointer text-primary hover:underline"
          to="/devices-locations"
        >
          Manage Devices and Locations
        </Link>
      </span>
    </div>
  );
};

export default OwnProfileCard;
