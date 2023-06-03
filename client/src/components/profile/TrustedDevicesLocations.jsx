import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTrustedContextAuthDataAction,
  deleteContextAuthDataAction,
  getBlockedAuthContextDataAction,
  blockContextAuthDataAction,
} from "../../redux/actions/authActions";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";

const TrustedDevicesLocations = ({ trustedAuthContextData }) => {
  const [deleteLoading, setDeleteLoading] = useState({});
  const [blockLoading, setBlockLoading] = useState({});
  const dispatch = useDispatch();

  const handleDelete = async (contextId) => {
    setDeleteLoading((prevState) => ({
      ...prevState,
      [contextId]: true,
    }));

    await dispatch(deleteContextAuthDataAction(contextId));
    await dispatch(getTrustedContextAuthDataAction());

    setDeleteLoading((prevState) => ({
      ...prevState,
      [contextId]: false,
    }));
  };

  const handleBlock = async (contextId) => {
    setBlockLoading((prevState) => ({
      ...prevState,
      [contextId]: true,
    }));

    await dispatch(blockContextAuthDataAction(contextId));
    await dispatch(getTrustedContextAuthDataAction());
    await dispatch(getBlockedAuthContextDataAction());

    setBlockLoading((prevState) => ({
      ...prevState,
      [contextId]: false,
    }));
  };

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

  return (
    <div className="max-w-3xl mx-auto mt-12 p-5">
      <h2 className="text-lg font-medium text-gray-900">
        Trusted Devices and Locations
      </h2>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {trustedDevices.length === 0 && (
              <span className="text-sm font-medium text-gray-900">
                Not available
              </span>
            )}

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
                      disabled={deleteLoading[device._id]}
                      onClick={() => handleDelete(device._id)}
                      type="button"
                      className="mx-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      {deleteLoading[device._id] ? (
                        <LoadingSpinner loadingText={"Removing..."} />
                      ) : (
                        <span>Remove</span>
                      )}
                    </button>
                    <button
                      disabled={blockLoading[device._id]}
                      onClick={() => handleBlock(device._id)}
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                    >
                      {blockLoading[device._id] ? (
                        <LoadingSpinner loadingText={"Blocking..."} />
                      ) : (
                        <span>Block</span>
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

export default TrustedDevicesLocations;
