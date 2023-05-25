import { useMemo, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";
import Navbar from "./components/common/Navbar";
import Leftbar from "./components/common/Leftbar";
import Rightbar from "./components/common/Rightbar";

import ModeratorRightbar from "./components/moderator/Rightbar";

const noRightbarRoutes = [
  /\/post\/[^/]+$/,
  /\/community\/[^/]+$/,
  /\/community\/[^/]+\/report$/,
  /\/community\/[^/]+\/reported-post$/,
  /\/community\/[^/]+\/moderator$/,
].map((regex) => new RegExp(regex));

const PrivateRoute = ({ userData }) => {
  const isAuthenticated = useMemo(() => {
    return (userData, accessToken) => {
      return userData && accessToken;
    };
  }, []);

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
  }, [dispatch, navigate, userData, accessToken, isAuthenticated]);

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
            <ModeratorRightbar />
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
