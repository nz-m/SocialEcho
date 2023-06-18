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
    <div className="bg-white rounded-md p-6 border">
      <div
        className="cursor-pointer text-xl flex justify-end"
        onClick={handleOpenModal}
      >
        <Tooltip text="Edit profile">
          <CiEdit />
        </Tooltip>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <img
              className="w-28 h-28 rounded-full mr-4 object-cover"
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
            <h2 className="text-lg font-bold text-center mt-5">{user.name}</h2>
            {user.bio ? (
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <GrContactInfo className="text-gray-500" />
                {user.bio}
              </p>
            ) : (
              <p className="text-gray-400 flex items-center justify-center gap-2">
                <GrContactInfo className="text-gray-500" />
                Bio not added
              </p>
            )}
            <hr className="mt-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start my-3">
        <p className="font-semibold">Location</p>
        {user.location ? (
          <p className="text-gray-700 flex gap-2 items-center">
            <CiLocationOn className="font-semibold" />
            {user.location}
          </p>
        ) : (
          <p className="text-gray-400 flex items-center gap-2">
            <CiLocationOn className="text-lg font-semibold" />
            Location not added
          </p>
        )}
      </div>

      <div className="">
        <h3 className="font-bold">Interests</h3>
        {user.interests ? (
          <ul className="flex items-center gap-2 mt-2">
            {user.interests.split(",").map((interest, i) => (
              <li
                key={i}
                className="border border-primary rounded-full p-1 text-primary text-sm"
              >
                {interest.trim()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            No interests have been set yet. Add some interests to let people
            know more about you.
          </p>
        )}
      </div>
      <span className="flex flex-col justify-center items-center mt-3 border-t">
        <Link
          className="text-primary mt-3 cursor-pointer hover:underline"
          to="/devices-locations"
        >
          Manage Devices and Locations
        </Link>
      </span>
    </div>
  );
};

export default OwnProfileCard;
