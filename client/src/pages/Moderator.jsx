import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/community/RightBar";
import ReportedPosts from "../components/moderator/ReportedPosts";
import MembersList from "../components/moderator/MembersList";
import ModeratorsList from "../components/moderator/ModeratorsList";
import BannerMembersList from "../components/moderator/BannerMembersList";
const Moderator = () => {
  return (
    <div className="flex mx-6">
      <Leftbar />
      <div className="w-6/12">
        <ModeratorProfile />
        <div className="border-2 my-5">
          <ReportedPosts />
          <MembersList />
          <ModeratorsList />
          <BannerMembersList />
        </div>
      </div>
      <RightBar />
    </div>
  );
};

export default Moderator;
