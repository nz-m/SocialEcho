import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import Rightbar from "../components/home/RightBar";

const Home = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <Leftbar />
          </div>
          <div className="col-span-8">
            <MainSection />
          </div>
          <div className="col-span-2">
            <Rightbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
