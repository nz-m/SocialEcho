import { lazy, Suspense, useEffect } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonLoading from "../components/loader/CommonLoading";

const MainSection = lazy(() => import("../components/moderator/MainSection"));
const ModeratorsList = lazy(() =>
  import("../components/moderator/ModeratorsList")
);

const Moderator = () => {
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth?.userData?.role);

  useEffect(() => {
    if (userRole !== "moderator") {
      navigate("/access-denied");
    }
  }, [userRole, navigate]);

  if (userRole !== "moderator") return <CommonLoading />;

  return (
    <Suspense fallback={<FallbackLoading />}>
      <>
        <div className="w-6/12 px-10 py-5">
          <MainSection />
        </div>
        <div className="w-3/12 h-[86vh] bg-white sticky top-20 right-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
          <ModeratorsList />
        </div>
      </>
    </Suspense>
  );
};

export default Moderator;
