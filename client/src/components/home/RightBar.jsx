import React from "react";

const RightBar = () => {
  return (
    <div className="w-1/4">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Search</h3>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Joined Communities</h3>
        <ul className="list-disc list-inside">
          <li className="text-gray-800 mb-1">Community 1</li>
          <li className="text-gray-800 mb-1">Community 2</li>
          <li className="text-gray-800 mb-1">Community 3</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Suggested</h3>
        <ul className="list-disc list-inside">
          <li className="text-gray-800 mb-1">Suggested 1</li>
          <li className="text-gray-800 mb-1">Suggested 2</li>
          <li className="text-gray-800 mb-1">Suggested 3</li>
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
