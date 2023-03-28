import React, { memo } from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const followingSince = new Date(user.followingSince).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72">
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">{user.name}</h2>
          <Link
            to={`/user/${user._id}`}
            className="text-blue-500 hover:underline"
          >
            View Profile
          </Link>
        </div>
        <div className="mb-2">
          <p className="font-semibold text-gray-500">Following Since</p>
          <p>{followingSince}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-500">Location</p>
          <p>{user.location || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileCard);
