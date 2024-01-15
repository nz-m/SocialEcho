import { useMemo, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";
import Navbar from "./components/shared/Navbar";
import Leftbar from "./components/shared/Leftbar";
import Rightbar from "./components/shared/Rightbar";

import ModeratorRightbar from "./components/moderator/Rightbar";
import { useNightMode } from "./context/NightModeContext";

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

  const [showLeftbar, setShowLeftbar] = useState(false);

  const toggleLeftbar = () => {
    setShowLeftbar(!showLeftbar);
  };
  const {Night} = useNightMode()
  return isAuthenticated(userData, accessToken) ? (
    <div className={Night ? "scroll-smooth h-fit bg-slate-900 text-white pb-10" :"scroll-smooth h-screen" }>
      <Navbar
        userData={userData}
        toggleLeftbar={toggleLeftbar}
        showLeftbar={showLeftbar}
      />

      <div className="md:mx-auto md:grid md:w-10/12 md:grid-cols-4 md:gap-6">
        <Leftbar showLeftbar={showLeftbar} />

        <Outlet />

        {showRightbar ? (
          currentUserIsModerator ? (
            <ModeratorRightbar />
          ) : (
            <Rightbar />
          )
        ) : null}
      </div>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
