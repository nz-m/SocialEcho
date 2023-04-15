import React from "react";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import PublicProfile from "../components/profile/PublicProfile";
import Navbar from "../components/home/Navbar";

const PublicProfilePage = () => {
  return (
    <div className="bg-[#F6F7FA]">
    <Navbar />
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
        <Leftbar />
        <PublicProfile />
        <RightBar />
      </div>
    </div>
  );
};

export default PublicProfilePage;
