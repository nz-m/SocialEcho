import { useEffect, lazy, Suspense } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";
import Navbar from "./components/common/Navbar";
import Leftbar from "./components/common/Leftbar";
import Rightbar from "./components/common/Rightbar";
import FallbackLoading from "./components/loader/FallbackLoading";

const ModeratorRightbar = lazy(() => import("./components/moderator/Rightbar"));

const noRightbarRoutes = [
  /\/post\/[^/]+$/,
  /\/community\/[^/]+$/,
  /\/community\/[^/]+\/report$/,
  /\/community\/[^/]+\/reported-post$/,
  /\/community\/[^/]+\/moderator$/,
];

noRightbarRoutes.forEach((regex, index) => {
  noRightbarRoutes[index] = new RegExp(regex);
});
const isAuthenticated = (userData, accessToken) => userData && accessToken;

const PrivateRoute = ({ userData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("profile");
  const accessToken = JSON.parse(token)?.accessToken;

  const currentUserIsModerator = userData?.role === "moderator";

  useEffect(() => {
    if (!isAuthenticated(userData, accessToken)) {
      dispatch(setInitialAuthState(navigate));
    }
  }, [userData, accessToken, dispatch, navigate]);

  const showRightbar = !noRightbarRoutes.some((regex) =>
    regex.test(location.pathname)
  );

  return isAuthenticated(userData, accessToken) ? (
    <>
      <Navbar />
      <div className="flex lg:px-40 mx-auto bg-[#F6F7FA] my-20">
        <Leftbar />
        <Outlet />
        {showRightbar ? (
          currentUserIsModerator ? (
            <Suspense fallback={<FallbackLoading />}>
              <ModeratorRightbar />
            </Suspense>
          ) : (
            <Rightbar />
          )
        ) : null}
      </div>
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
