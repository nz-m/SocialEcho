import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
import { useSelector } from "react-redux";

const MainSection = lazy(() => import("../components/home/MainSection"));

const Home = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <Suspense fallback={<FallbackLoading />}>
      <MainSection userData={userData} />
    </Suspense>
  );
};

export default Home;
