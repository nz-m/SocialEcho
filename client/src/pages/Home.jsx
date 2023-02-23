import React from "react";
import Leftbar from "../components/home/LeftBar";
import MainSection from "../components/home/MainSection";
import Rightbar from "../components/home/RightBar";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.userData);
  console.log(user);

  return (
    <div className=" mx-6">
      <div className="flex justify-between">
        <div>
          {user && <h1 className="text-4xl font-bold">Welcome {user.name}</h1>}
        </div>
        <Leftbar />

        <MainSection />

        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
