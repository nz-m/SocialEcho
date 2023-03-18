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
  const { communityMods } = useSelector((state) => state.moderation);

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold">Moderators</h3>
      <div className="flex flex-col">
        {communityMods &&
          communityMods.map((moderator) => (
            <div
              key={moderator._id}
              className="flex flex-row items-center border border-black rounded-md my-2"
            >
              <Link to={`/user/${moderator._id}`}>
                <img
                  src={moderator.avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <p className="ml-2 font-bold">{moderator.name}</p>
                <div className="flex flex-col">
                  {" "}
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
