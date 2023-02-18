import React from "react";
// import ProfilePicture from "../components/profile/ProfilePicture";
// import Posts from "../components/profile/Posts";
import Post from "../components/home/Post";
import Leftbar from "../components/home/LeftBar";
import UserProfile from "../components/home/UserProfile";
import RightBar from "../components/home/RightBar";

const ProfilePage = () => {
  return (
    <div className="mx-6 ">
      <div className="flex justify-between gap-5">
      <Leftbar/>
      <div className="grid grid-cols-1 gap-4 mt-5">
        <UserProfile/>
        <Post />

        <Post />

        <Post />
      </div>
      <RightBar/>
      </div>
    </div>
  );
};

export default ProfilePage;
