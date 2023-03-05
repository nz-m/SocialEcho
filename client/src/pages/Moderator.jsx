import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/community/RightBar";
const Moderator = () => {
  return (
    <div className="flex mx-6">
      <Leftbar />
      <div className="w-6/12">
        <ModeratorProfile />
        here goes the settings for the moderator to add/delete new rules and
        guidelines, and to add/delete new moderators // see reported posts and
        comments and delete them if necessary // see the list of members and
        delete them if necessary
      </div>
      <RightBar />
    </div>
  );
};

export default Moderator;
