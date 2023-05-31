import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLogsAction,
  deleteLogsAction,
} from "../../redux/actions/adminActions";
import CurrentTime from "../shared/CurrentTime";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import { BarLoader } from "react-spinners";
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
    return <BarLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-4 shadow-md rounded relative xl:min-w-[1200px] lg:min-w-[1000px] md:min-w-[800px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium bg-white sticky top-0 left-0 shadow-2xl shadow-[#F3F8FF] p-2 my-2 rounded">
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
            <div className="text-sm text-center text-gray-500 text-lg">
              No logs found
            </div>
          ) : (
            <>
              <div className="h-[500px] overflow-auto">
                <table className="w-full shadow-2xl shadow-[#F3F8FF] px-6 py-6 relative bg-white rounded table-auto">
                  <thead className="font-medium sticky top-0 left-0 shadow-2xl bg-white shadow-[#F3F8FF] px-6 py-6 my-5 rounded bg-gray-100">
                    <tr className="rounded overflow-hidden">
                      <th className="p-2 border-b border-slate-200 shadow-sm">
                        Timestamp
                      </th>
                      <th className="p-2 border-b border-slate-200 shadow-sm">
                        Message
                      </th>
                      <th className="p-2 border-b border-slate-200 shadow-sm">
                        Email Used
                      </th>
                      <th className="p-2 border-b border-slate-200 shadow-sm">
                        Level
                      </th>
                      <th className="p-2 border-b border-slate-200 shadow-sm">
                        Context Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-gray-50">
                        <td className="p-2 border-b border-gray-300 text-center">
                          <div className="text-sm text-gray-600">
                            {log.relativeTimestamp}
                          </div>
                          <div className="text-xs text-gray-400">
                            {log.formattedTimestamp}
                          </div>
                        </td>

                        <td
                          className={`p-2 border-b border-gray-300 ${
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

                        <td className="p-2 border-b border-gray-300">
                          {log.email}
                        </td>
                        <td className="p-2 border-b border-gray-300">
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

                        <td className="p-2 border-b border-gray-300">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
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
