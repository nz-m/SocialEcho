import React from "react";
import LeftBar from "../components/home/LeftBar";
import RightBar from "../components/home/RightBar";
import TrustedDevicesLocations from "../components/profile/TrustedDevicesLocations";
import PrimaryDevicesLocations from "../components/profile/PrimaryDevicesLocations";
import BlockedDevicesLocations from "../components/profile/BlockedDevicesLocations";
const DevicesLocations = () => {
  return (
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
      <LeftBar />
      <div className="flex-1">
        <PrimaryDevicesLocations />
        <TrustedDevicesLocations />
        <BlockedDevicesLocations />
      </div>
      <RightBar />
    </div>
  );
};

export default DevicesLocations;
