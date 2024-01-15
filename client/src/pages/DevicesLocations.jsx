import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TrustedDevicesLocations from "../components/profile/TrustedDevicesLocations";
import PrimaryDevicesLocations from "../components/profile/PrimaryDevicesLocations";
import BlockedDevicesLocations from "../components/profile/BlockedDevicesLocations";
import CommonLoading from "../components/loader/CommonLoading";

import {
  getTrustedContextAuthDataAction,
  getUserPreferencesAction,
  getBlockedAuthContextDataAction,
  getContextAuthDataAction,
} from "../redux/actions/authActions";
import { useNightMode } from "../context/NightModeContext";

const DevicesLocations = () => {
  const dispatch = useDispatch();
  const [dateFetched, setDateFetched] = useState(false);
  const {Night} = useNightMode()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserPreferencesAction());
      await dispatch(getContextAuthDataAction());
      await dispatch(getTrustedContextAuthDataAction());
      await dispatch(getBlockedAuthContextDataAction());
    };
    fetchData().then(() => setDateFetched(true));
  }, [dispatch, dateFetched]);

  const userPreferences = useSelector((state) => state.auth?.userPreferences);
  const contextAuthData = useSelector((state) => state.auth?.contextAuthData);
  const trustedAuthContextData = useSelector(
    (state) => state.auth?.trustedAuthContextData
  );
  const blockedContextAuthData = useSelector(
    (state) => state.auth?.blockedAuthContextData
  );

  if (!dateFetched) {
    return (
      <div className="col-span-2 flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  if (!userPreferences || !contextAuthData) {
    return (
      <div className={Night ? "bg-slate-800 p-5 text-gray-700 text-center main-section" : "bg-white border p-5 text-gray-700 text-center main-section"}>
        <p className={Night ? "text-lg font-semibold mb-4 text-white" : "text-lg font-semibold mb-4"}>
          Context-based authentication is currently disabled for your account.
        </p>
        <p className={Night ? "text-sm text-white" : "text-sm"}>
          By enabling context-based authentication, you will gain control over
          your devices, their locations, and manage trusted and blocked devices.
        </p>
      </div>
    );
  }

  return (
    <div className="main-section border bg-white">
      <PrimaryDevicesLocations contextAuthData={contextAuthData} />

      <TrustedDevicesLocations
        trustedAuthContextData={trustedAuthContextData}
      />
      <BlockedDevicesLocations
        blockedContextAuthData={blockedContextAuthData}
      />
    </div>
  );
};

export default DevicesLocations;
