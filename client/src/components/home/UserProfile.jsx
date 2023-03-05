import React from "react";
import rownok1 from "../../assets/rownok.png";
const UserProfile = () => {
  return (
    <div className="w-6/12 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={rownok1}
            alt="Profile"
          ></img>
          <div>
            <h2 className="text-2xl font-bold">User name</h2>
            <p className="text-gray-600">Occupation</p>
            <p className="text-gray-600">Location</p>
          </div>
        </div>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
          Settings
        </button>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Interests</h3>
        <ul className="list-disc list-inside">
          <li>Interest 1</li>
          <li>Interest 2</li>
          <li>Interest 3</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default UserProfile;
