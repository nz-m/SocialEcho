import React from "react";
import { Link } from "react-router-dom";
import { RiEditCircleLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
const SelfProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg  p-6 shadow-2xl shadow-[#F3F8FF]">
      <div className="flex flex-col justify-between items-center ">
        <div className="  flex flex-col justify-center items-center">
          <div className="relative">
            <img
              className="w-28 h-28 rounded-full mr-4"
              src={user.avatar}
              alt="Profile"
            ></img>
            <Link
              to="/edit-profile"
              state={{ userInfo: user }}
              className="bg-primary py-3  px-3 rounded-full absolute -bottom-2 shadow-lg hover:bg-blue-700 right-3"
            >
              <RiEditCircleLine className="text-lg text-white" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mt-5">{user.name}</h2>
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
        <p className="font-semibold text-lg ">Location</p>
        {user.location ? (
          <p className="text-gray-700 flex gap-2 items-center">
            <CiLocationOn className="text-lg font-semibold" />
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
        <h3 className="text-lg font-bold ">Interests</h3>
        {user.interests ? (
          <ul className="flex items-center gap-4 mt-2">
            {user.interests.split(",").map((interest, i) => (
              <li
                key={i}
                className="border border-primary rounded-full px-2 py-1 text-primary"
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
          className="text-primary text-lg mt-3 cursor-pointer hover:underline"
          to="/devices-locations"
        >
          Manage Devices and Locations
        </Link>
      </span>
    </div>
  );
};

export default SelfProfileCard;
