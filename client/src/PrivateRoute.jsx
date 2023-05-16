import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialAuthState } from "./redux/actions/authActions";
import Navbar from "./components/common/Navbar";
import LeftBar from "./components/common/Leftbar";

const isAuthenticated = (userData, accessToken) => userData && accessToken;

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const token = localStorage.getItem("profile");
  const accessToken = JSON.parse(token)?.accessToken;

  useEffect(() => {
    if (!isAuthenticated(userData, accessToken)) {
      dispatch(setInitialAuthState(navigate));
    }
  }, [userData, accessToken, dispatch, navigate]);

  return isAuthenticated(userData, accessToken) ? (
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
