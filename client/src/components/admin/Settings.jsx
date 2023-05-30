import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [usePerspectiveAPI, setUsePerspectiveAPI] = useState(false);
  const [
    categoryFilteringServiceProvider,
    setCategoryFilteringServiceProvider,
  ] = useState("");
  const [categoryFilteringRequestTimeout, setCategoryFilteringRequestTimeout] =
    useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("/admin/preferences", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("admin")).accessToken
          }`,
        },
      })

      .then((response) => {
        const {
          usePerspectiveAPI,
          categoryFilteringServiceProvider,
          categoryFilteringRequestTimeout,
        } = response.data;
        setUsePerspectiveAPI(usePerspectiveAPI);
        setCategoryFilteringServiceProvider(categoryFilteringServiceProvider);
        setCategoryFilteringRequestTimeout(categoryFilteringRequestTimeout);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleLogout();
        } else {
          setError(error.message);
          setIsLoading(false);
        }
      });
  });
  const clearLocalStorage = () => {
    localStorage.removeItem("admin");
  };
  const handleLogout = async () => {
    await clearLocalStorage();
    navigate("/admin/signin");
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    axios
      .put(
        "/admin/preferences",
        {
          usePerspectiveAPI,
          categoryFilteringServiceProvider,
          categoryFilteringRequestTimeout,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).accessToken
            }`,
          },
        }
      )
      .then(() => {
        setIsUpdating(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleLogout();
        } else {
          setError(error.message);
          setIsUpdating(false);
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Service Preferences</h2>

      {isSuccess && (
        <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
          Service Preferences updated successfully!
        </div>
      )}

      <div className="flex items-center mb-4">
        <div>Use Perspective API for content moderation</div>
        <div className="ml-auto">
          <input
            type="checkbox"
            checked={usePerspectiveAPI}
            onChange={(e) => setUsePerspectiveAPI(e.target.checked)}
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div>Category filtering service provider</div>
        <div className="ml-auto">
          <select
            value={categoryFilteringServiceProvider}
            onChange={(e) =>
              setCategoryFilteringServiceProvider(e.target.value)
            }
          >
            <option value="TextRazor">TextRazor</option>
            <option value="InterfaceAPI">InterfaceAPI</option>
            <option value="ClassifierAPI">ClassifierAPI</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div>Category filtering request timeout (ms)</div>
        <div className="ml-auto">
          <input
            type="number"
            value={categoryFilteringRequestTimeout}
            required
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 5000 && value <= 500000) {
                setCategoryFilteringRequestTimeout(value);
              }
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
