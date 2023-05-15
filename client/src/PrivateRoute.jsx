/**
 * @function PrivateRoute
 * @description A higher order component that protects routes from unauthenticated
 * access by redirecting to the login page if the user is not authenticated.
 * @returns {JSX.Element} The component that renders the child routes if the user is authenticated,
 * or redirects to the login page if the user is not authenticated.
 */

import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";
import Navbar from "./components/common/Navbar";
import LeftBar from "./components/common/Leftbar";

function isAuthenticated(user, accessToken) {
  return user && accessToken;
}

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const token = localStorage.getItem("profile");
  const accessToken = JSON.parse(token)?.accessToken;

  useEffect(() => {
    if (!isAuthenticated(user, accessToken)) {
      dispatch(setInitialAuthState(navigate));
    }
  }, [user, accessToken, dispatch, navigate]);

  return isAuthenticated(user, accessToken) ? (
    <>
      <Navbar />
      <div className="flex lg:px-40 mx-auto bg-[#F6F7FA] my-20">
        <LeftBar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
