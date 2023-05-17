import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";
import { useSelector } from "react-redux";

const UserProfile = lazy(() => import("../components/profile/UserProfile"));

const Profile = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <Suspense fallback={<FallbackLoading />}>
      <UserProfile userData={userData} />
    </Suspense>
  );
};

export default Profile;
