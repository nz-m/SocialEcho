import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComModsAction } from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

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
              <Link to={`/user/${moderator._id}`} className='flex'>
                <img
                  src={moderator.avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex flex-col">
                    <p className="ml-2 font-bold">{moderator.name}</p>
                  <p className="ml-2">{moderator.location}</p>
                  <p className="ml-2">
                    Joined: {new Date(moderator.createdAt).toDateString()}
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
