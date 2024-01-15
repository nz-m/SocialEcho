import { Link } from "react-router-dom";
import { useNightMode } from "../../context/NightModeContext";

const JoinedCommunityCard = ({ community }) => {
  const {Night} = useNightMode()
  return (
 
  <Link to={`/community/${community.name}`} className={Night ? "flex flex-col mb-5 bg-slate-800 w-full px-4 py-4 shadow-2xl shadow-[#f2f5fc] rounded-md" : "flex flex-col mb-5 bg-white w-full px-4 py-4 border shadow-2xl shadow-[#f2f5fc] rounded-md" }>
      <img className="" src={community.banner} alt="" loading="lazy" />
      <h3 className={Night ? "text-lg font-semibold mb-2 text-White" : "text-lg font-semibold mb-2"}>{community.name}</h3>
      <p className={Night ? "text-gray-300 mb-2" : "text-gray-700 mb-2"}>{community.members.length} members</p>
    </Link>
  
  
  );
};

export default JoinedCommunityCard;
