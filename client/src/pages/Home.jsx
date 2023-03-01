import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import Rightbar from "../components/home/RightBar";

const Home = () => {
  return (
    <div className="flex mx-6">
      <Leftbar />

      <MainSection />

      <Rightbar />
    </div>
  );
};

export default Home;
