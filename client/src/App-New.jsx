// App.jsx
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route, useLocation } from "react-router-dom";
import FallbackLoading from "./components/loader/FallbackLoading";
import { getTitleFromRoute } from "./utils/docTitle";
import PrivateRoute from "./PrivateRoute";
import routes from "./routes";

const AppNew = ({ adminAccessToken }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>
      <Suspense fallback={<FallbackLoading />}>
        <Routes>
          {routes.map((route, index) => {
            const { path, element, private: isPrivate, admin } = route;
            const LazyComponent = lazy(() =>
              import(`./pages/${element.type.name}`)
            );

            return (
              <Route
                key={index}
                path={path}
                element={
                  isPrivate ? (
                    <PrivateRoute userData={userData} admin={admin}>
                      <LazyComponent />
                    </PrivateRoute>
                  ) : (
                    <LazyComponent />
                  )
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppNew;
