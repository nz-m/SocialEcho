import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/community/MainSection";
import RightBar from "../components/community/RightBar";

const CommunityPage = () => {
  return (
    <div className="mx-6">
      <div className="flex justify-between">
        <Leftbar />
        <MainSection />
        <RightBar />
      </div>
    </div>
  );
};

export default CommunityPage;
