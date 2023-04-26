import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getTitleFromRoute } from "./utils/docTitle";
import CommonLayout from "./layouts/CommonLayout";
import SelectiveLayout from "./layouts/SelectiveLayout";
import FallbackLoading from "./components/loader/FallbackLoading";

import SignupForm from "./components/auth/SignupForm";
import SignIn from "./components/auth/SignIn";
import PrivateRoute from "./PrivateRoute";
import ReportPost from "./components/community/ReportPost";
import EditProfileForm from "./components/form/EditProfileForm";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerifiedMessage from "./pages/EmailVerifiedMessage";
import BlockDevice from "./pages/BlockDevice";
import LoginVerified from "./pages/LoginVerified";
import CommunityRightBar from "./components/community/RightBar";
import RightBar from "./components/common/RightBar";

const Moderator = lazy(() => import("./pages/Moderator"));
const PostPage = lazy(() => import("./pages/PostPage"));
const SelfPostPage = lazy(() => import("./pages/SelfPostPage"));
const ReportedPostPage = lazy(() => import("./pages/ReportedPostPage"));
const Saved = lazy(() => import("./pages/Saved"));
const PublicProfile = lazy(() => import("./components/profile/PublicProfile"));
const AllCommunities = lazy(() => import("./pages/AllCommunities"));
const MyCommunities = lazy(() => import("./pages/MyCommunities"));
const Following = lazy(() => import("./pages/Following"));
const DevicesLocations = lazy(() => import("./pages/DevicesLocations"));
const MainSection = lazy(() => import("./components/home/MainSection"));
const UserProfile = lazy(() => import("./components/profile/UserProfile"));
const CommunityMainSection = lazy(() =>
  import("./components/community/MainSection")
);

const App = () => {
  const user = useSelector((state) => state.auth?.userData);
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <MainSection />
                </Suspense>
                <RightBar />
              </CommonLayout>
            }
          />
          <Route
            path="/home"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <MainSection />
                </Suspense>
                <RightBar />
              </CommonLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <UserProfile />
                </Suspense>
              </SelectiveLayout>
            }
          />

          <Route
            path="/post/:postId"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <PostPage />
                </Suspense>
              </CommonLayout>
            }
          />
          <Route
            path="/my/post/:postId"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <SelfPostPage />
                </Suspense>
              </CommonLayout>
            }
          />
          <Route
            path="/community/:communityName"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <CommunityMainSection />
                </Suspense>
                <CommunityRightBar />
              </CommonLayout>
            }
          />
          <Route
            path="/community/:communityName/report"
            element={<ReportPost />}
          />
          <Route
            path="/community/:communityName/reported-post"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <ReportedPostPage />
                </Suspense>
                <CommunityRightBar />
              </CommonLayout>
            }
          />

          <Route
            path="/community/:communityName/moderator"
            element={
              <CommonLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <Moderator />
                </Suspense>
              </CommonLayout>
            }
          />
          <Route
            path="/saved"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <Saved />
                </Suspense>
              </SelectiveLayout>
            }
          />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route
            path="/user/:userId"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <PublicProfile />
                </Suspense>
              </SelectiveLayout>
            }
          />
          <Route
            path="/communities"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <AllCommunities />
                </Suspense>
              </SelectiveLayout>
            }
          />
          <Route
            path="/my-communities"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <MyCommunities />
                </Suspense>
              </SelectiveLayout>
            }
          />
          <Route
            path="/following"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <Following />
                </Suspense>
              </SelectiveLayout>
            }
          />
          <Route
            path="/devices-locations"
            element={
              <SelectiveLayout>
                <Suspense fallback={<FallbackLoading />}>
                  <DevicesLocations />
                </Suspense>
              </SelectiveLayout>
            }
          />
        </Route>
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/auth/verify" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerifiedMessage />} />
        <Route path="/block-device" element={<BlockDevice />} />
        <Route path="/verify-login" element={<LoginVerified />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
