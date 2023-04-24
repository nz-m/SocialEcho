import TrustedDevicesLocations from "../components/profile/TrustedDevicesLocations";
import PrimaryDevicesLocations from "../components/profile/PrimaryDevicesLocations";
import BlockedDevicesLocations from "../components/profile/BlockedDevicesLocations";
const DevicesLocations = () => {
  return (
    <div className="flex-1">
      <PrimaryDevicesLocations />
      <TrustedDevicesLocations />
      <BlockedDevicesLocations />
    </div>
  );
};

export default DevicesLocations;
