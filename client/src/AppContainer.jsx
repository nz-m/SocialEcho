import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import createAppStore from "./redux/store";
import axios from "axios";
import CommonLoading from "./components/loader/CommonLoading";
import App from "./App";
import { getTitleFromRoute } from "./utils/docTitle";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const ErrorComponent = ({ errorMessage }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

const AppContainer = () => {
  const location = useLocation();
  const [store, setStore] = useState(null);
  const [serverReady, setServerReady] = useState(false);
  const [storeReady, setStoreReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get("/server-status");
        setServerReady(true);
      } catch (err) {
        setError("Server is down. Please try again later.");
      }
    };

    checkServerStatus();
  }, []);

  // Asynchronously initialize the Redux store, including data fetching and authentication,
  // while displaying a loading indicator. Making sure that the store is initialized with credentials and data before rendering the app.

  useEffect(() => {
    if (!serverReady) return;

    const initializeStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
        setStoreReady(true);
      } catch (err) {
        setError(`Error initializing the app: ${err.message}`);
      }
    };

    initializeStore();
  }, [serverReady]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorComponent errorMessage={error} />
      </div>
    );
  }

  if (!storeReady || !store) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>
      <App />
    </Provider>
  );
};

export default AppContainer;
