import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import FallbackLoading from "./components/loader/FallbackLoading";

import { getTitleFromRoute } from "./utils/docTitle";

import PrivateRoute from "./PrivateRoute";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import SelfPost from "./pages/SelfPost";
import CommunityHome from "./pages/CommunityHome";
import Saved from "./pages/Saved";
import PublicProfile from "./pages/PublicProfile";
import AllCommunities from "./pages/AllCommunities";
import MyCommunities from "./pages/MyCommunities";
import Following from "./pages/Following";

const ReportedPost = lazy(() => import("./pages/ReportedPost"));
const ReportPost = lazy(() => import("./components/community/ReportPost"));
const Moderator = lazy(() => import("./pages/Moderator"));
const EditProfileForm = lazy(() => import("./components/form/EditProfileForm"));
const DevicesLocations = lazy(() => import("./pages/DevicesLocations"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminSignIn = lazy(() => import("./pages/AdminSignIn"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const EmailVerifiedMessage = lazy(() => import("./pages/EmailVerifiedMessage"));
const BlockDevice = lazy(() => import("./pages/BlockDevice"));
const LoginVerified = lazy(() => import("./pages/LoginVerified"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = ({ adminAccessToken }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>
      </Helmet>
      <Suspense fallback={<FallbackLoading />}>
        <Routes>
          <Route element={<PrivateRoute userData={userData} />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/my/post/:postId" element={<SelfPost />} />
            <Route
              path="/community/:communityName"
              element={<CommunityHome />}
            />

            {/*todo: make modal*/}
            <Route
              path="/community/:communityName/report"
              element={<ReportPost />}
            />

            <Route
              path="/community/:communityName/reported-post"
              element={<ReportedPost />}
            />
            <Route
              path="/community/:communityName/moderator"
              element={<Moderator />}
            />

            <Route path="/saved" element={<Saved />} />
            {/*todo: make modal*/}
            <Route path="/edit-profile" element={<EditProfileForm />} />
            <Route path="/user/:userId" element={<PublicProfile />} />

            <Route path="/communities" element={<AllCommunities />} />

            <Route path="/my-communities" element={<MyCommunities />} />
            <Route path="/following" element={<Following />} />
            <Route path="/devices-locations" element={<DevicesLocations />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={userData ? <Navigate to="/" /> : <SignIn />}
          />

          <Route
            path="/admin"
            element={adminAccessToken ? <AdminPanel /> : <AdminSignIn />}
          />
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/auth/verify" element={<VerifyEmail />} />
          <Route path="/email-verified" element={<EmailVerifiedMessage />} />
          <Route path="/block-device" element={<BlockDevice />} />
          <Route path="/verify-login" element={<LoginVerified />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
