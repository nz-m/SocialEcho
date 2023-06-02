import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTrustedContextAuthDataAction,
  getBlockedAuthContextDataAction,
  unblockContextAuthDataAction,
} from "../../redux/actions/authActions";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";

const BlockedDevicesLocations = ({ blockedContextAuthData }) => {
  const [loading, setLoading] = useState({});
  const dispatch = useDispatch();

  const handleUnblock = async (contextId) => {
    setLoading((prevState) => ({
      ...prevState,
      [contextId]: true,
    }));

    await dispatch(unblockContextAuthDataAction(contextId));
    await dispatch(getBlockedAuthContextDataAction());
    await dispatch(getTrustedContextAuthDataAction());

    setLoading((prevState) => ({
      ...prevState,
      [contextId]: false,
    }));
  };

  const blockedDevices = blockedContextAuthData?.map((device) => ({
    _id: device._id,
    device: device.device,
    deviceType: device.deviceType,
    ipAddress: device.ip,
    location: `${device.city}, ${device.country}`,
    browser: device.browser,
    operatingSystem: device.os,
    time: device.time,
  }));

  return (
    <div className="max-w-3xl mx-auto mt-12 p-5">
      <h2 className="text-lg font-medium text-gray-900">
        Blocked Devices and Locations
      </h2>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {blockedDevices.length === 0 && (
              <span className="text-sm font-medium text-gray-900">
                Not available
              </span>
            )}
            {blockedDevices.map((device) => (
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
                      disabled={loading[device._id]}
                      onClick={() => handleUnblock(device._id)}
                      type="button"
                      className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${
                        loading[device._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                      }`}
                    >
                      {loading[device._id] ? (
                        <LoadingSpinner loadingText={"unblocking..."} />
                      ) : (
                        "Unblock"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockedDevicesLocations;
