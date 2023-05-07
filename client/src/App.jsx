import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getTitleFromRoute } from "./utils/docTitle";
import { Helmet } from "react-helmet";

import FallbackLoading from "./components/loader/FallbackLoading";
import SignupForm from "./pages/SignupForm";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./PrivateRoute";
import ReportPost from "./components/community/ReportPost";
import EditProfileForm from "./components/form/EditProfileForm";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerifiedMessage from "./pages/EmailVerifiedMessage";
import BlockDevice from "./pages/BlockDevice";
import LoginVerified from "./pages/LoginVerified";
import CommunityRightBar from "./components/community/RightBar";
import RightBar from "./components/common/Rightbar";
import CommonLoading from "./components/loader/CommonLoading";
import AdminSignIn from "./pages/AdminSignIn";

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
const NotFound = lazy(() => import("./pages/NotFound"));

const WithSuspense = ({ component: Component }) => (
  <Suspense fallback={<FallbackLoading />}>
    <Component />
  </Suspense>
);

const WithRightbarAndSuspense = ({ component: Component }) => (
  <>
    <WithSuspense component={Component} />
    <RightBar />
  </>
);

const App = () => {
  const user = useSelector((state) => state.auth?.userData);
  const adminAccessToken = JSON.parse(
    localStorage.getItem("admin")
  )?.accessToken;
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
            element={<WithRightbarAndSuspense component={MainSection} />}
          />
          <Route
            path="/home"
            element={<WithRightbarAndSuspense component={MainSection} />}
          />
          <Route
            path="/profile"
            element={<WithRightbarAndSuspense component={UserProfile} />}
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
            element={<WithRightbarAndSuspense component={Saved} />}
          />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route
            path="/user/:userId"
            element={<WithRightbarAndSuspense component={PublicProfile} />}
          />
          <Route
            path="/communities"
            element={<WithRightbarAndSuspense component={AllCommunities} />}
          />
          <Route
            path="/my-communities"
            element={<WithRightbarAndSuspense component={MyCommunities} />}
          />
          <Route
            path="/following"
            element={<WithRightbarAndSuspense component={Following} />}
          />
          <Route
            path="/devices-locations"
            element={<WithRightbarAndSuspense component={DevicesLocations} />}
          />
        </Route>

        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/admin"
          element={
            adminAccessToken ? (
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-screen">
                    <CommonLoading />
                  </div>
                }
              >
                <AdminPanel />
              </Suspense>
            ) : (
              <AdminSignIn />
            )
          }
        />

        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/auth/verify" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerifiedMessage />} />
        <Route path="/block-device" element={<BlockDevice />} />
        <Route path="/verify-login" element={<LoginVerified />} />
        <Route path="*" element={<WithSuspense component={NotFound} />} />
      </Routes>
    </>
  );
};

export default App;
