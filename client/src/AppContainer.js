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
