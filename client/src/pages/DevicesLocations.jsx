import React from "react";
import LeftBar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import TrustedDevicesLocations from "../components/profile/TrustedDevicesLocations";
import PrimaryDevicesLocations from "../components/profile/PrimaryDevicesLocations";
const DevicesLocations = () => {
  return (
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
      <LeftBar />
      <div className="flex-1">
        <PrimaryDevicesLocations />
        <TrustedDevicesLocations />
      </div>
      <RightBar />
    </div>
  );
};

export default DevicesLocations;
