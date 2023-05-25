import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import FallbackLoading from "./components/loader/FallbackLoading";
import { publicRoutes, privateRoutes } from "./routes";

import { getTitleFromRoute } from "./utils/docTitle";

import PrivateRoute from "./PrivateRoute";
import SignIn from "./pages/SignIn";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminSignIn = lazy(() => import("./pages/AdminSignIn"));

const App = ({ adminAccessToken }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>
      <Suspense fallback={<FallbackLoading />}>
        <Routes>
          <Route element={<PrivateRoute userData={userData} />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route
            path="/signin"
            element={userData ? <Navigate to="/" /> : <SignIn />}
          />

          <Route
            path="/admin"
            element={adminAccessToken ? <AdminPanel /> : <AdminSignIn />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
