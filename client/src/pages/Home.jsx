import React from "react";
import LeftBar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import RightBar from "../components/home/RightBar";

import Navbar from "../components/home/Navbar";
const Home = () => {
  return (
    <div className="bg-[#F6F7FA]">
      <Navbar />
      <div className="flex lg:px-48 mx-auto bg-[#F6F7FA]">
        <LeftBar />
        <MainSection />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
