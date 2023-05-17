import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
// Lazy load the components
const MainSection = lazy(() => import("../components/home/MainSection"));

const Home = () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <MainSection />
    </Suspense>
  );
};

export default Home;
