import React from "react";
import { Link } from "react-router-dom";

const JoinedCommunityCard = ({ community }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-gray-100 rounded-lg p-4">
      <img
        className="object-cover w-full h-48"
        src={community.banner}
        alt=""
        loading="lazy"
      />

      <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
      <p className="text-gray-700 mb-2">{community.members.length} members</p>
      <p className="text-gray-700 text-center">{community.description}</p>
      <Link
        to={`/community/${community.name}`}
        className="bg-blue-400 hover:bg-blue-500 text-white rounded-md py-2 px-4 mt-4"
      >
        Go to community
      </Link>
    </div>
  );
};

export default JoinedCommunityCard;
