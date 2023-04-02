import React from "react";
import Leftbar from "../components/home/LeftBar";
import UserProfile from "../components/profile/UserProfile";
import RightBar from "../components/home/RightBar";

const ProfilePage = () => {
  return (

      <div className="flex lg:gap-10 lg:px-48  mx-auto">
        <Leftbar />
        <UserProfile />
        <RightBar />
   
    </div>
  );
};

export default ProfilePage;
