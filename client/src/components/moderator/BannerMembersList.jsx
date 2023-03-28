import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComMembersAction,
  unbanUserAction,
} from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const BannerMembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const { bannedUsers } = useSelector((state) => state.moderation) || {};

  const unbanHandler = async (userId) => {
    await dispatch(unbanUserAction(communityName, userId));
    dispatch(getComMembersAction(communityName));
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold">Banned Users</h3>
      <div className="flex flex-col">
        {bannedUsers &&
          bannedUsers.map((bannedMember) => (
            <div
              key={bannedMember._id}
              className="flex flex-row  items-center border border-black rounded-md my-2"
            >
              <img
                src={bannedMember.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <Link to={`/user/${bannedMember._id}`} className="ml-2 font-bold">
                {bannedMember.name}
              </Link>
              <div className="flex flex-col">
                <p className="ml-2">{bannedMember.location}</p>
                <p className="ml-2">
                  Joined: {new Date(bannedMember.createdAt).toDateString()}
                </p>
              </div>
              <button
                onClick={() => {
                  unbanHandler(bannedMember._id);
                }}
                className="ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold rounded px-2 py-1 text-sm"
              >
                Unban user
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BannerMembersList;
