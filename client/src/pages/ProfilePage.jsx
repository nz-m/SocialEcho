import React from "react";
import Leftbar from "../components/home/LeftBar";
import UserProfile from "../components/profile/UserProfile";
import RightBar from "../components/home/RightBar";
import Navbar from "../components/home/Navbar";

const ProfilePage = () => {
  return (
    <div className="bg-[#f6fbff]">
  
    <Navbar/>
   <div className="flex lg:px-48 mx-auto bg-[#f6fbff]">
    <Leftbar />
    <UserProfile/>
    <RightBar />
  </div>
  </div>
  );
};

export default ProfilePage;
