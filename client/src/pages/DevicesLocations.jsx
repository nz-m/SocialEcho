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

const DevicesLocations = () => {
  const dispatch = useDispatch();
  const [dateFetched, setDateFetched] = useState(false);

  const userPreferences = useSelector((state) => state.auth?.userPreferences);
  const contextAuthData = useSelector((state) => state.auth?.contextAuthData);
  const trustedAuthContextData = useSelector(
    (state) => state.auth?.trustedAuthContextData
  );
  const blockedContextAuthData = useSelector(
    (state) => state.auth?.blockedAuthContextData
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserPreferencesAction());
      await dispatch(getContextAuthDataAction());
      await dispatch(getTrustedContextAuthDataAction());
      await dispatch(getBlockedAuthContextDataAction());
      setDateFetched(true);
    };

    fetchData();
  }, [dispatch, dateFetched]);

  if (!dateFetched) {
    return (
      <div className="w-6/12 flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  if (!userPreferences || !contextAuthData) {
    return (
      <div className="w-6/12 flex justify-center h-screen">
        Context-based authentication is diabled for your account. By enabling
        context-based authentication, you will be able to manage your devices
        and their locations, as well as manage your trusted and blocked devices.
      </div>
    );
  }

  return (
    <div className="flex-1">
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
