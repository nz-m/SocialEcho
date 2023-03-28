import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComMembersAction,
  banUserAction,
  getCommunityAction,
} from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const MembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const { communityMembers } = useSelector((state) => state.moderation) || {};

  const banHandler = async (userId) => {
    await dispatch(banUserAction(communityName, userId));
    await dispatch(getComMembersAction(communityName));
    dispatch(getCommunityAction(communityName));
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold">General Members</h3>
      <div className="flex flex-col">
        {communityMembers &&
          communityMembers.map((member) => (
            <div
              key={member._id}
              className="flex flex-row  items-center border border-black rounded-md my-2"
            >
              <img
                src={member.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <Link to={`/user/${member._id}`} className="ml-2 font-bold">
                {member.name}
              </Link>
              <div className="flex flex-col">
                <p className="ml-2">{member.location}</p>
                <p className="ml-2">
                  Joined: {new Date(member.createdAt).toDateString()}
                </p>
              </div>
              <button
                onClick={() => {
                  banHandler(member._id);
                }}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded px-2 py-1 text-sm"
              >
                Ban user
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MembersList;
