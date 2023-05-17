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
      <CommunityMainSection />
      <CommunityRightbar />
    </>
  );
};

export default CommunityHome;
