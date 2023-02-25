import React from "react";
import { MdOutlineReport } from "react-icons/md";

import {
  HiOutlineHandThumbUp,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmarkSquare,
} from "react-icons/hi2";
const Post = ({ post }) => {
 
  const { body, fileUrl, user, community, createdAt } = post;

  return (
    <div className="px-6 py-6  mx-auto rounded-xl shadow-xl bg-white border border-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{community.name}</p>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>

      <div>
        <p className="text-lg">{body}</p>
        {fileUrl && (
          <img
            className="w-[600px] h-auto rounded-xl mt-3"
            src={fileUrl}
            alt={body}
            loading="lazy"
          />
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <p className="flex items-center text-xl cursor-pointer gap-1">
              {" "}
              <HiOutlineHandThumbUp /> 2
            </p>
            <p className="flex items-center text-xl cursor-pointer gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft /> 2
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="flex items-center text-xl cursor-pointer gap-1">
              {" "}
              <HiOutlineBookmarkSquare />
              Save
            </p>
            <p className="flex items-center text-xl cursor-pointer gap-1">
              {" "}
              <MdOutlineReport />
              Report
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
