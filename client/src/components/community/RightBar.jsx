import React from "react";
import { Link } from "react-router-dom";

const RightBar = () => {
  return (
    <div className="w-1/4 p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2>A banner goes here</h2>
        <h2 className="text-lg font-bold mb-4">Community Name</h2>
        <h3>Brief Bio here</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-2">24,567</span>
          joined members
        </div>
        <div>
          {/*  a community moderation panel link
           */}

          <Link to="/community/moderator" className="text-blue-500">
            Community Settings (available to moderators only)
          </Link>
        </div>

        <div className="text-gray-500 mb-4">
          <span className="font-bold">Moderators:</span> Alice, Bob, Charlie
        </div>
        <div className="text-gray-500 mb-4">
          <span className="font-bold">Community Guidelines:</span>

          <ul className="list-disc list-inside">
            <li>Be nice</li>
            <li>Be respectful</li>
            <li>Be kind</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
