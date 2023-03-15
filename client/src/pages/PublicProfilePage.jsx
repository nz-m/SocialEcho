import React from "react";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import PublicProfile from "../components/profile/PublicProfile";

const PublicProfilePage = () => {
  return (
    <div className="mx-6">
      <div className="flex justify-between">
        <Leftbar />

        <PublicProfile />
        <RightBar />
      </div>
    </div>
  );
};

export default PublicProfilePage;
