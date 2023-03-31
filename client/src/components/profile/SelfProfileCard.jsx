import React from "react";
import { Link } from "react-router-dom";

const SelfProfileCard = ({ user }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user.avatar}
            alt="Profile"
          ></img>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            {user.bio ? (
              <p className="text-gray-600">{user.bio}</p>
            ) : (
              <p className="text-gray-400">bio not added</p>
            )}

            {user.location ? (
              <p className="text-gray-600">{user.location}</p>
            ) : (
              <p className="text-gray-400">Location not added</p>
            )}
          </div>
        </div>
        <Link
          to="/edit-profile"
          state={{ userInfo: user }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Edit Profile
        </Link>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Interests</h3>
        {user.interests &&
          user.interests.filter((interest) => interest !== "").length > 0 && (
            <ul className="list-disc list-inside">
              {user.interests.map((interest, i) => {
                return <span key={i}>{interest} </span>;
              })}
            </ul>
          )}
        {user.interests &&
          user.interests.filter((interest) => interest !== "").length === 0 && (
            <p className="text-gray-600">
              No interests have been set yet. Add some interests to let people
              know more about you.
            </p>
          )}
      </div>
    </div>
  );
};

export default SelfProfileCard;
