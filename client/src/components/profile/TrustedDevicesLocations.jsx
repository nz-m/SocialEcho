import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTrustedContextAuthDataAction,
  getUserPreferencesAction,
} from "../../redux/actions/authActions";

const TrustedDevicesLocations = () => {
  const dispatch = useDispatch();
  const trustedAuthContextData = useSelector(
    (state) => state.auth?.trustedAuthContextData
  );
  const userPreferences = useSelector((state) => state.auth?.userPreferences);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserPreferencesAction());
      await dispatch(getTrustedContextAuthDataAction());
    };
    fetchData();
  }, [dispatch]);

  if (!trustedAuthContextData) {
    return <>Loading...</>;
  }

  const trustedDevices = trustedAuthContextData?.map((device) => ({
    _id: device._id,
    device: device.device,
    deviceType: device.deviceType,
    ipAddress: device.ip,
    location: `${device.city}, ${device.country}`,
    browser: device.browser,
    operatingSystem: device.os,
    time: device.time,
  }));

  // const trustedDevices = [
  //   {
  //     _id: "1",
  //     device: "MacBook Pro",
  //     deviceType: "Laptop",
  //     ipAddress: "123df.dfasdf",
  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",
  //     time: "March 12th, 2023 12:00 AM",
  //   },
  //   {
  //     _id: "2",
  //     device: "iPhone 12 Pro",
  //     deviceType: "Mobile",
  //     ipAddress: "192.168.0.1",

  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",
  //     time: "March 12th, 2023 12:00 AM",
  //   },
  //   {
  //     _id: "3",
  //     device: "MacBook Pro",
  //     deviceType: "Laptop",
  //     ipAddress: "192.168.0.1",
  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",

  //     time: "March 12th, 2023 12:00 AM",
  //   },
  //   {
  //     _id: "4",
  //     device: "MacBook Pro",
  //     deviceType: "Laptop",
  //     ipAddress: "192.168.0.1",
  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",
  //     time: "March 12th, 2023 12:00 AM",
  //   },
  //   {
  //     _id: "3",
  //     device: "MacBook Pro",
  //     deviceType: "Laptop",
  //     ipAddress: "192.168.0.1",
  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",

  //     time: "March 12th, 2023 12:00 AM",
  //   },
  //   {
  //     _id: "4",
  //     device: "MacBook Pro",
  //     deviceType: "Laptop",
  //     ipAddress: "192.168.0.1",
  //     location: "New York, USA",
  //     browser: "Chrome",
  //     operatingSystem: "MacOS",
  //     time: "March 12th, 2023 12:00 AM",
  //   },
  // ];

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-lg font-medium text-gray-900">
        Trusted Devices and Locations
      </h2>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flow-root">
          {userPreferences?.enableContextBasedAuth && (
            <ul className="-my-5 divide-y divide-gray-200">
              {trustedDevices.map((device) => (
                <li key={device._id} className="py-5">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="min-w-0 flex-1">
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {device.device} {device.deviceType} - {device.time}
                        </span>

                        <span className="ml-1 text-sm text-gray-500">
                          ({device.ipAddress})
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {device.location}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {device.browser} on {device.operatingSystem}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <span>Remove</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                      >
                        <span>Block</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!userPreferences?.enableContextBasedAuth && (
            <span className="text-sm font-medium text-gray-900">
              Context Based Authentication is disabled in your account
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustedDevicesLocations;
