import { useEffect } from "react";
import CommonLoading from "../components/loader/CommonLoading";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import CommunityRightbar from "../components/community/Rightbar";
import CommunityMainSection from "../components/community/MainSection";

const CommunityHome = () => {
  const navigate = useNavigate();
  const { communityName } = useParams();

  const joinedCommunities = useSelector((state) =>
    state.community?.joinedCommunities?.map(({ name }) => name)
  );

  const isAuthorized = joinedCommunities?.includes(communityName);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/access-denied");
    }
  }, [isAuthorized, navigate, communityName]);

  if (!joinedCommunities)
    return (
      <div className="col-span-3 flex justify-center items-center h-screen">
        <CommonLoading />
      </div>
    );

  return (
    <>
      <div className="main-section">
        <CommunityMainSection />
      </div>
      <div className="col-span-1 flex-col-reverse bg-white sticky top-20 h-[85vh] p-5 rounded-md border overflow-y-auto">
        <CommunityRightbar />
      </div>
    </>
  );
};

export default CommunityHome;
