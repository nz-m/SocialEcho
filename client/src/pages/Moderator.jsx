import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/moderator/MainSection";
import ModeratorsList from "../components/moderator/ModeratorsList";

const Moderator = () => {
  return (
    <div className="flex mx-6">
      <Leftbar />
      <div className="w-6/12">
        <ModeratorProfile />

        <MainSection />
      </div>
      <div className="w-3/12">
        <ModeratorsList />
      </div>
    </div>
  );
};

export default Moderator;
