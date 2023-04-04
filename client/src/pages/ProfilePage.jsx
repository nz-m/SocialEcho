import React from "react";
import Leftbar from "../components/home/LeftBar";
import UserProfile from "../components/profile/UserProfile";
import RightBar from "../components/home/RightBar";
import Navbar from "../components/home/Navbar";

const ProfilePage = () => {
  return (
    <div className="bg-[#F6F7FA]">
  
    <Navbar/>
   <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
    <Leftbar />
    <UserProfile/>
    <RightBar />
  </div>
  </div>
  );
};

export default ProfilePage;
