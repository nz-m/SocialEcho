import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonLoading from "../components/loader/CommonLoading";

import MainSection from "../components/moderator/MainSection";
import ModeratorsList from "../components/moderator/ModeratorsList";

const Moderator = () => {
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth?.userData?.role);

  useEffect(() => {
    if (userRole !== "moderator") {
      navigate("/access-denied");
    }
  }, [userRole, navigate]);

  if (userRole !== "moderator")
    return (
      <div className="col-span-3 flex items-center justify-center h-screen">
        <CommonLoading />
      </div>
    );

  return (
    <>
      <div className="col-span-2 bg-white mt-6 border rounded-md">
        <MainSection />
      </div>
      <div className="col-span-1 bg-white sticky top-20 border h-screen-20 p-5 rounded-md">
        <ModeratorsList />
      </div>
    </>
  );
};

export default Moderator;
