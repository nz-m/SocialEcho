import React from "react";
import PostCreate from "../auth/PostCreate";
import Form from "../form/Form";
import Post from "../home/Post";


const MainSection = ({ communityName }) => {
  return (
    <div className="flex-grow h-full bg-gray-100">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {communityName}
        </h1>
        <div className="flex flex-col mt-4">
          <div className="mb-4">
            
           <PostCreate/>
          </div>

          <div className="mt-4 flex flex-col gap-4">
<p className="text-xl font-semibold my-5"> Recent post form this community</p>
           

            {/* Add other community components */}
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
