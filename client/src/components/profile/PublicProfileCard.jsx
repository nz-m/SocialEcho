import { memo } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { RiUserShared2Line } from "react-icons/ri";
const PublicProfileCard = ({ user }) => {
  const followingSince = new Date(user.followingSince).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/user/${user._id}`}
      className="bg-white border border-dashed border-slate-500 rounded-lg shadow-2xl w-full shadow-[#F3F8FF] px-4 py-4 cursor-pointer"
    >
      <div className="flex gap-3">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="font-bold text-base">{user.name}</h2>
          <p className="flex items-center gap-2">
            <CiLocationOn className="text-lg" />
            {user.location || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-500">Following Since</p>
          <p>{followingSince}</p>
        </div>
        <RiUserShared2Line className=" text-white rounded-lg bg-primary w-9 h-9 px-1 py-1 hover:text-primary hover:bg-white hover:border hover:border-dashed hover:border-slate-500" />
      </div>
    </Link>
  );
};

export default memo(PublicProfileCard);
