import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import Rightbar from "../components/home/RightBar";

import Navbar from "../components/home/Navbar";
const Home = () => {
  return (
    <div className="bg-[#f6fbff]">
  
      <Navbar/>
     <div className="flex lg:px-48 mx-auto bg-[#f6fbff]">
      <Leftbar />
      <MainSection />
      <Rightbar />
    </div>
    </div>
   
  );
};

export default Home;
