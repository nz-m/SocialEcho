import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";

const CommunityRightbar = lazy(() =>
  import("../components/community/Rightbar")
);
const CommunityMainSection = lazy(() =>
  import("../components/community/MainSection")
);

const CommunityHome = () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <CommunityMainSection />
      <CommunityRightbar />
    </Suspense>
  );
};

export default CommunityHome;
