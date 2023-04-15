import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModProfileAction } from "../../redux/actions/authActions";
import {HiOutlineUser} from "react-icons/hi2";
import {MdOutlineMail,MdJoinInner} from "react-icons/md";

const ModeratorProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);

  const moderator = useSelector((state) => state.moderation?.modProfile);
  if (!moderator) return null; // later add a loading spinner

  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-white sticky top-24 left-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
      <img
        src={moderator.avatar}
        alt="user"
        className="w-20 h-20 rounded-full object-cover"
      />
      <p>
        <span className="font-bold">{moderator.name}</span>
      </p>

      <p className='flex items-center gap-2'>
        <span className="font-bold">
            <MdOutlineMail/>
        </span> {moderator.email}
      </p>
      <p className='flex items-center gap-2'>
        <span className="font-bold">
            <MdJoinInner/>
        </span> {moderator.createdAt}
      </p>
      <p>Other infos here, will be added later</p>
    </div>
  );
};

export default ModeratorProfile;
