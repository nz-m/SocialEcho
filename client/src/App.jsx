import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getTitleFromRoute } from "./utils/docTitle";
import { Helmet } from "react-helmet";

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
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

const WithSuspense = ({ component: Component }) => (
  <Suspense fallback={<FallbackLoading />}>
    <Component />
  </Suspense>
);

const WithRightBarAndSuspense = ({ component: Component }) => (
  <>
    <WithSuspense component={Component} />
    <RightBar />
  </>
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
            element={<WithRightBarAndSuspense component={MainSection} />}
          />
          <Route
            path="/home"
            element={<WithRightBarAndSuspense component={MainSection} />}
          />
          <Route
            path="/profile"
            element={<WithRightBarAndSuspense component={UserProfile} />}
          />

          <Route
            path="/post/:postId"
            element={<WithSuspense component={PostPage} />}
          />
          <Route
            path="/my/post/:postId"
            element={<WithSuspense component={SelfPostPage} />}
          />
          <Route
            path="/community/:communityName"
            element={
              <>
                <WithSuspense component={CommunityMainSection} />
                <CommunityRightBar />
              </>
            }
          />
          <Route
            path="/community/:communityName/report"
            element={<ReportPost />}
          />
          <Route
            path="/community/:communityName/reported-post"
            element={
              <>
                <WithSuspense component={ReportedPostPage} />
                <CommunityRightBar />
              </>
            }
          />

          <Route
            path="/community/:communityName/moderator"
            element={<WithSuspense component={Moderator} />}
          />
          <Route
            path="/saved"
            element={<WithRightBarAndSuspense component={Saved} />}
          />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route
            path="/user/:userId"
            element={<WithRightBarAndSuspense component={PublicProfile} />}
          />
          <Route
            path="/communities"
            element={<WithRightBarAndSuspense component={AllCommunities} />}
          />
          <Route
            path="/my-communities"
            element={<WithRightBarAndSuspense component={MyCommunities} />}
          />
          <Route
            path="/following"
            element={<WithRightBarAndSuspense component={Following} />}
          />
          <Route
            path="/devices-locations"
            element={<WithRightBarAndSuspense component={DevicesLocations} />}
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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
