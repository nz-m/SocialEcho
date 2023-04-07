/**
 * A container component that sets up the Redux store and
 * checks server status before rendering the main application.
 *
 * @component
 * @returns {JSX.Element} The rendered React component
 * 
 * @description
 * This component sets up the Redux store using `createAppStore()` and
 * checks server status using an HTTP GET request to `/check-connectivity`.
 * If the server is down, the component will display an error message.
 * If there is an error setting up the store, it will also display an error message.
 */

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import createAppStore from "./redux/store";
import App from "./App";
import axios from "axios";

const AppContainer = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get("/check-connectivity");
      } catch (error) {
        setError("Server is down. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    checkServerStatus();
  }, []);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadStore();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 font-bold text-center">{error}</div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
