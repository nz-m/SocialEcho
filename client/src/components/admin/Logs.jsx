import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLogsAction,
  deleteLogsAction,
} from "../../redux/actions/adminActions";
import CurrentTime from "../shared/CurrentTime";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import CommonLoading from "../loader/CommonLoading";
import { FcRefresh } from "react-icons/fc";

const Logs = () => {
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const dispatch = useDispatch();
  const logs = useSelector((state) => state.admin?.logs);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      await dispatch(getLogsAction());
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    try {
      setClearing(true);
      await dispatch(deleteLogsAction());
    } finally {
      setClearing(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await fetchLogs();
    } catch (error) {}
  };

  useEffect(() => {
    fetchLogs();
  }, [logs?.length]);

  if (loading || !logs) {
    return (
      <div className="flex items-center justify-center mt-5">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center mt-3 rounded-md">
      <div className=" p-4 shadow-md rounded relative xl:min-w-[1200px] lg:min-w-[1000px] md:min-w-[800px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium bg-white  shadow-2xl shadow-[#F3F8FF] p-2 my-2 rounded-md">
            User Activity Logs
          </h1>
          <CurrentTime />
        </div>

        <div className="flex justify-between items-center mb-2 border border-gray-200 p-2 rounded">
          <div className="text-sm italic text-gray-600">{`Showing ${logs.length} items from the last 7 days`}</div>

          <div className="flex items-center space-x-2">
            <button onClick={handleRefresh}>
              <FcRefresh />
            </button>
            <button
              className={`bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 ${
                clearing ? "opacity-50 cursor-not-allowed" : ""
              } ${logs.length === 0 ? "hidden" : ""}`}
              onClick={handleCleanup}
              disabled={clearing || logs.length === 0}
            >
              {clearing ? (
                <ButtonLoadingSpinner loadingText="Clearing..." />
              ) : (
                "Clear Logs"
              )}
            </button>
          </div>
        </div>

        {!loading ? (
          logs.length === 0 ? (
            <div className="  text-gray-500 text-lg">No logs found</div>
          ) : (
            <>
              <div className="h-[430px] relative overflow-auto">
                <div className="w-full shadow-2xl sticky top-0 left-0 shadow-[#F3F8FF]  bg-white rounded">
                  <div className="grid grid-cols-5 gap-5 items-center border-b py-2 text-lg font-semibold">
                    <p>Timestamp</p>
                    <p>Message</p>
                    <p> Email Used</p>
                    <p>Level</p>
                    <p>Context Data</p>
                  </div>
                  {logs.map((log) => (
                    <div
                      key={log._id}
                      className="grid grid-cols-5 gap-5 items-center border-b py-2 "
                    >
                      <p className="flex flex-col text-center">
                        <p> {log.relativeTimestamp}</p>
                        <p> {log.formattedTimestamp}</p>
                      </p>
                      <td
                        className={` ${
                          log.level === "info"
                            ? "text-blue-500"
                            : log.level === "warn"
                            ? "text-orange-500"
                            : log.level === "error"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        <span className="capitalize">{log.type}: </span>
                        <span>{log.message}</span>
                      </td>
                      <p> {log.email}</p>
                      <td className="">
                        <span
                          className={`rounded-full px-2 py-1 text-sm font-semibold ${
                            log.level === "error"
                              ? "bg-red-500 text-white"
                              : log.level === "warn"
                              ? "bg-orange-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {log.level}
                        </span>
                      </td>
                      <td className="">
                        <ul className="list-disc list-inside">
                          {log.contextData &&
                            Object.entries(log.contextData).map(
                              ([key, value]) => (
                                <li key={key}>
                                  <span className="font-medium text-blue-500">
                                    {key}:{" "}
                                  </span>
                                  {value}
                                </li>
                              )
                            )}
                        </ul>
                      </td>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-center text-sm italic text-gray-600 mt-2">
                  logs are automatically deleted after 7 days
                </div>
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Logs;
