import React from "react";
import {MdOutlineReport} from 'react-icons/md'

import { HiOutlineHandThumbUp,HiOutlineChatBubbleOvalLeft,HiOutlineBookmarkSquare} from "react-icons/hi2";
const Post = ({
  username,
  avatarUrl,
  community,
  postTime,
  content,
  imageUrl,
  likes,
  dislikes,
}) => {
  return (
    <div className="px-6 py-6  mx-auto rounded-xl shadow-xl bg-white border border-gray-100">
      <div className="flex justify-between">
      <div className="flex gap-2">
        <img className="rounded-full overflow-hidden"
          src={
            "https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
          }
          alt={`Nz's avatar`}
          style={{ width: "50px", height: "50px" }}
        />
        <div className="">
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-sm text-gray-500">@Education</p>
          
        </div>
      </div>
      <p>9h ago</p>
      </div>
     
      <div>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin</p>
        <img className="w-full rounded-xl mt-3"
          src={
            "https://a-static.besthdwallpaper.com/alone-in-unknown-world-wallpaper-1600x900-33874_47.jpg"
          }
          alt={`Nz's avatar`}
         

          // add slow loading image
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
          <p className="flex items-center text-xl cursor-pointer gap-1"> <HiOutlineHandThumbUp/> 2</p>
          <p className="flex items-center text-xl cursor-pointer gap-1"> <HiOutlineChatBubbleOvalLeft/> 2</p>
          </div>
          <div className="flex items-center gap-2">
          <p className="flex items-center text-xl cursor-pointer gap-1"> <HiOutlineBookmarkSquare/>Save</p>
          <p className="flex items-center text-xl cursor-pointer gap-1"> <MdOutlineReport/>Report</p>
         
          </div>
       
         
        </div>
      </div>
    </div>
  );
};

export default Post;
