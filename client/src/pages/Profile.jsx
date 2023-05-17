import { lazy, Suspense } from "react";
import FallbackLoading from "../components/loader/FallbackLoading";

const UserProfile = lazy(() => import("../components/profile/UserProfile"));

const Profile = () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <UserProfile />
    </Suspense>
  );
};

export default Profile;
