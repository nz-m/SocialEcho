import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import Rightbar from "../components/home/RightBar";

const Home = () => {
  return (
    <div className=" mx-6">
      <div className="flex justify-between">
        <Leftbar />

        <MainSection />

        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
