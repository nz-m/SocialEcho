import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComModsAction } from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const ModeratorsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getComModsAction(communityName));
  }, [dispatch, communityName]);
  const communityMods = useSelector((state) => state.moderation?.communityMods);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">Moderators</h3>
      <div className="flex flex-col">
        {communityMods &&
          communityMods.map((moderator) => (
            <div
              key={moderator._id}
              className="flex items-center border border-slate-200 rounded-md my-2 px-4 py-3"
            >
              <Link to={`/user/${moderator._id}`} className="flex">
                <img
                  src={moderator.avatar}
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />

                <div className="flex flex-col">
                  <p className="ml-2 font-bold line-clamp-1">
                    {moderator.name}
                  </p>
                  <p className="ml-2 text-xs flex gap-1 items-center">
                    <CiLocationOn />
                    {moderator.location}
                  </p>
                  <p className="ml-2 text-xs flex gap-1 items-center">
                    <IoTimerOutline />
                    {new Date(moderator.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModeratorsList;
