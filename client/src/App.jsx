/**
 * Project Name: SocialEcho
 * Description: A social networking platform with automated content moderation and context-based authentication system.
 *
 * Author: Neaz Mahmud
 * Email: neaz6160@gmail.com
 * Date: 19th June 2023
 */

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import FallbackLoading from "./components/loader/FallbackLoading";
import { publicRoutes, privateRoutes } from "./routes";

import PrivateRoute from "./PrivateRoute";
import SignIn from "./pages/SignIn";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminSignIn = lazy(() => import("./pages/AdminSignIn"));

const App = () => {
  const userData = useSelector((state) => state.auth?.userData);
  const adminAccessToken = JSON.parse(
    localStorage.getItem("admin")
  )?.accessToken;

  return (
    <Suspense fallback={<FallbackLoading />}>
      <Routes>
        <Route element={<PrivateRoute userData={userData} />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
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
          path="/admin/signin"
          element={
            adminAccessToken ? <Navigate to="/admin" /> : <AdminSignIn />
          }
        />

        <Route
          path="/admin"
          element={
            adminAccessToken ? <AdminPanel /> : <Navigate to="/admin/signin" />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
