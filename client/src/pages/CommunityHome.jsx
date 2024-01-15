import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import CommonLoading from "../components/loader/CommonLoading";
import CommunityRightbar from "../components/community/Rightbar";
import CommunityMainSection from "../components/community/MainSection";
import { useNightMode } from "../context/NightModeContext";

const CommunityHome = () => {
  const navigate = useNavigate();
  const { communityName } = useParams();
  const {Night} = useNightMode()

  const { joinedCommunities } = useSelector((state) => state.community || {});
  const isAuthorized = joinedCommunities?.some(
    ({ name }) => name === communityName
  );

  useEffect(() => {
    if (!isAuthorized && joinedCommunities?.length > 0) {
      navigate("/access-denied");
    }
  }, [isAuthorized, joinedCommunities, navigate, communityName]);

  if (!joinedCommunities) {
    return (
      <div className="col-span-3 flex h-screen items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <>
      <div className={Night ? "main-section bg-slate-800" : "main-section bg-white"}>
        <CommunityMainSection />
      </div>
      <div className={Night ? "col-span-1 h-[85vh] overflow-y-auto rounded-md border bg-slate-800 p-5 md:sticky md:top-20" : "col-span-1 h-[85vh] overflow-y-auto rounded-md border bg-white p-5 md:sticky md:top-20"}>
        <CommunityRightbar />
      </div>
    </>
  );
};

export default CommunityHome;
