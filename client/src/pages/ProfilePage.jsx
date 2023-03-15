import React from "react";
import Leftbar from "../components/home/LeftBar";
import UserProfile from "../components/home/UserProfile";
import RightBar from "../components/home/RightBar";

const ProfilePage = () => {
  return (
    <div className="mx-6">
      <div className="flex justify-between">
        <Leftbar />

        <UserProfile />

        <RightBar />
      </div>
    </div>
  );
};

export default ProfilePage;
