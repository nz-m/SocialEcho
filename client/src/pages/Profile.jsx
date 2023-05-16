import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";

const UserProfile = lazy(() => import("../components/profile/UserProfile"));
const Rightbar = lazy(() => import("../components/common/Rightbar"));

const Profile = () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <UserProfile />
      <Rightbar />
    </Suspense>
  );
};

export default Profile;
