import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/admin/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-4 shadow-md rounded-md">
        <h1 className="text-lg font-medium mb-4">User Activity Logs</h1>
        <table className="w-full text-left border-collapse border border-gray-300 max-h-96 overflow-y-scroll">
          <thead className="font-medium">
            <tr className="border-b border-gray-300">
              <th className="p-2 border-r border-gray-300">Timestamp</th>
              <th className="p-2 border-r border-gray-300">Message</th>
              <th className="p-2 border-r border-gray-300">Context Data</th>
              <th className="p-2 border-r border-gray-300">Email</th>
              <th className="p-2 border-r border-gray-300">Level</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="p-2 border-r border-gray-300">
                  {log.formattedTimestamp}
                </td>
                <td className="p-2 border-r border-gray-300">
                  <span
                    className={`font-semibold capitalize ${
                      log.type === "sign in"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {log.type}:{" "}
                  </span>

                  {log.message}
                </td>
                <td className="p-2 border-r border-gray-300">
                  <ul className="list-disc list-inside">
                    {log.contextData &&
                      Object.entries(log.contextData).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium text-blue-500">
                            {key}:{" "}
                          </span>
                          {value}
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="p-2 border-r border-gray-300">{log.email}</td>
                <td className="p-2 capitalize">
                  <span
                    className={`rounded-full px-2 py-1 text-sm font-semibold ${
                      log.level === "error"
                        ? "bg-red-500 text-white"
                        : log.level === "warn"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {log.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
