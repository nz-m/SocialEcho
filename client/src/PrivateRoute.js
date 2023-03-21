import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";

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
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
