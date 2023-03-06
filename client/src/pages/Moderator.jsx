import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/community/RightBar";
import ReportedPosts from "../components/moderator/ReportedPosts";
const Moderator = () => {
  return (
    <div className="flex mx-6">
      <Leftbar />
      <div className="w-6/12">
        <ModeratorProfile />
        <div className="border-2 my-5">
          <h3>Reported Posts</h3>
          <ReportedPosts />
        </div>
      </div>
      <RightBar />
    </div>
  );
};

export default Moderator;
