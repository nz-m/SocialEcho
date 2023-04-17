import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/moderator/MainSection";
import ModeratorsList from "../components/moderator/ModeratorsList";
import Navbar from "../components/home/Navbar";

const Moderator = () => {
  return (
      <div className="bg-[#F6F7FA]">
          <Navbar />
          <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
      <Leftbar />
      <div className="w-6/12 px-10 py-5">


        <MainSection />
      </div>
      <div className="w-3/12 h-[86vh] bg-white sticky top-20 right-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
        <ModeratorsList />
      </div>
    </div>
    </div>
  );
};

export default Moderator;
