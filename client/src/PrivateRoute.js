import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.userData);
  const token = localStorage.getItem("profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      // clear user data from state and local storage
      localStorage.removeItem("profile");
      // dispatch an action to clear the user data from state
      navigate("/signin");
    }
  }, [user, token, navigate]);

  if (!user || !token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
