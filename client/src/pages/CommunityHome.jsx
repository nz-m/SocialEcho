import { lazy, Suspense, useEffect } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
import CommonLoading from "../components/loader/CommonLoading";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const CommunityRightbar = lazy(() =>
  import("../components/community/Rightbar")
);
const CommunityMainSection = lazy(() =>
  import("../components/community/MainSection")
);

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
    <Suspense fallback={<FallbackLoading />}>
      <CommunityMainSection />
      <CommunityRightbar />
    </Suspense>
  );
};

export default CommunityHome;
