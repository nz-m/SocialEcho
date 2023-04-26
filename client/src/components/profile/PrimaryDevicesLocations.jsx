const PrimaryDevicesLocations = ({ contextAuthData }) => {
  const primaryDevice = {
    "First Added": contextAuthData?.firstAdded,
    "IP Address": contextAuthData?.ip,
    Country: contextAuthData?.country,
    City: contextAuthData?.city,
    Browser: contextAuthData?.browser,
    Platform: contextAuthData?.platform,
    OS: contextAuthData?.os,
    Device: contextAuthData?.device,
    "Device Type": contextAuthData?.deviceType,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-medium text-gray-900">
          Primary Devices and Locations
        </h2>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {Object.entries(primaryDevice).map(([key, value]) => (
              <div key={key} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDevicesLocations;
