import { useEffect } from "react";
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
    };

    fetchData();
  }, [dispatch]);

  if (
    !userPreferences ||
    !contextAuthData ||
    !trustedAuthContextData ||
    !blockedContextAuthData
  ) {
    return (
      <div className="w-6/12 flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <PrimaryDevicesLocations
        contextAuthData={contextAuthData}
        userPreferences={userPreferences}
      />
      <TrustedDevicesLocations
        trustedAuthContextData={trustedAuthContextData}
        userPreferences={userPreferences}
      />
      <BlockedDevicesLocations
        blockedContextAuthData={blockedContextAuthData}
        userPreferences={userPreferences}
      />
    </div>
  );
};

export default DevicesLocations;
