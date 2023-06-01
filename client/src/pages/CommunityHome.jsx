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

  if (!joinedCommunities) return <CommonLoading />;

  return (
    <>
      <div className="col-span-2 bg-white mt-6 border rounded-md">
        <CommunityMainSection />
      </div>
      <div className="col-span-1 bg-white sticky top-20 border h-screen-20 p-5 rounded-md">
        <CommunityRightbar />
      </div>
    </>
  );
};

export default CommunityHome;
