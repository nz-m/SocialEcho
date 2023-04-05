import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/community/MainSection";
import RightBar from "../components/community/RightBar";
import Navbar from "../components/home/Navbar";

const CommunityPage = () => {
  return (
    <div className="bg-[#F6F7FA]">
    <Navbar />
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
        <Leftbar />
        <MainSection />
        <RightBar />
      </div>
    </div>
  );
};

export default CommunityPage;
