import { useState } from "react";
import JoinModal from "../modals/JoinModal";
import placeholder from "../../assets/placeholder.png";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useNightMode } from "../../context/NightModeContext";
const CommunityCard = ({ community }) => {
  const [joinModalVisibility, setJoinModalVisibility] = useState({});
  const {Night} = useNightMode()

  const toggleJoinModal = (communityId, visible) => {
    setJoinModalVisibility((prev) => ({
      ...prev,
      [communityId]: visible,
    }));
  };
  return (
    <div className={Night ? "px-3 py-3 rounded-md bg-slate-900 shadow-2xl shadow-[#f2f5fc] flex justify-between" : "px-3 py-3 rounded-md border bg-white shadow-2xl shadow-[#f2f5fc] flex justify-between"}>
      <div className="w-full flex items-start">
        <img
          className="object-cover rounded-full w-10 h-10 mr-4"
          src={community.banner || placeholder}
          alt="community banner"
          loading="lazy"
        />
        <div className="">
          <h4 className={Night ? "text-base font-semibold line-clamp-1 text-white" : "text-base font-semibold line-clamp-1"}>{community.name}</h4>
          <p className={Night ? "text-gray-300 " : "text-gray-700 "}>
            {community.members.length} members
          </p>
        </div>
      </div>

      <div className="">
        <button
          onClick={() => toggleJoinModal(community._id, true)}
          className="px-2.5 py-2.5 bg-primary shadow-2xl shadow-[#F3F8FF] hover:bg-transparent group hover:border rounded-xl hover:border-primary transition duration-300"
        >
          <MdOutlineGroupAdd className="text-lg text-white group-hover:text-primary" />
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
