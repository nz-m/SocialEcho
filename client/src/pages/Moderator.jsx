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

  if (userRole !== "moderator") {
    return (
      <div className="col-span-3 flex h-screen items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <>
      <div className="main-section rounded border bg-white">
        <MainSection />
      </div>
      <div className="h-screen-20 sticky top-20 col-span-1 rounded border bg-white p-5">
        <ModeratorsList />
      </div>
    </>
  );
};

export default Moderator;
