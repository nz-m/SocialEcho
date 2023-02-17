import React from "react";
// import ProfilePicture from "../components/profile/ProfilePicture";
// import Posts from "../components/profile/Posts";
import Post from "../components/home/Post";
import Leftbar from "../components/home/LeftBar";

const ProfilePage = () => {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 pr-6">
          {/* <ProfilePicture /> */}

          <img
            className="w-32 h-32 rounded-full"
            src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
            alt="profile"
          />

          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900">John Doe</h2>
            <p className="text-gray-500">@johndoe</p>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              quis massa id dui sollicitudin ullamcorper. Nullam auctor enim
              lacus, id faucibus nibh lobortis vitae.
            </p>
          </div>
          <div className="mt-8">
            <button className="mr-4 text-white bg-blue-500 py-2 px-4 rounded">
              Edit Profile
            </button>
            <button className="text-gray-700 border border-gray-400 py-2 px-4 rounded">
              Message
            </button>
          </div>
        </div>
        <div className="sm:w-2/3">
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
