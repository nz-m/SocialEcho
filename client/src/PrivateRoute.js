import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.userData);

  if (!user) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};
export default PrivateRoute;
