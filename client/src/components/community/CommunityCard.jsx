import React, { useState } from "react";
import JoinModal from "../modals/JoinModal";
import placeholder from "../../assets/placeholder.png";

const CommunityCard = ({ community }) => {
  const [joinModalVisibility, setJoinModalVisibility] = useState({});

  const toggleJoinModal = (communityId, visible) => {
    setJoinModalVisibility((prev) => ({
      ...prev,
      [communityId]: visible,
    }));
  };
  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm">
      <img
        className="object-cover w-full h-48"
        src={community.banner || placeholder}
        alt=""
        loading="lazy"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {community.name}
        </h4>
        <p className="text-gray-700 mb-2">{community.members.length} members</p>

        <p className="mb-2 leading-normal">
          {community.description.substring(0, 100)}...
        </p>
        <button
          onClick={() => toggleJoinModal(community._id, true)}
          className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
        >
          Join
        </button>
        <JoinModal
          show={joinModalVisibility[community._id] || false}
          onClose={() => toggleJoinModal(community._id, false)}
          community={community}
        />
      </div>
    </div>
  );
};

export default CommunityCard;
