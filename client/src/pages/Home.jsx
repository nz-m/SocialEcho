import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
// Lazy load the components
const MainSection = lazy(() => import("../components/home/MainSection"));
const Rightbar = lazy(() => import("../components/common/Rightbar"));

const Home = () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <MainSection />
      <Rightbar />
    </Suspense>
  );
};

export default Home;
