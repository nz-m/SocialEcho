import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { getTitleFromRoute } from "./utils/docTitle";

import PrivateRoute from "./PrivateRoute";
import ReportPost from "./components/community/ReportPost";
import EditProfileForm from "./components/form/EditProfileForm";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CommunityHome from "./pages/CommunityHome";
import Moderator from "./pages/Moderator";
import Post from "./pages/Post";
import SelfPost from "./pages/SelfPost";
import ReportedPost from "./pages/ReportedPost";
import Saved from "./pages/Saved";
import PublicProfile from "./pages/PublicProfile";
import AllCommunities from "./pages/AllCommunities";
import MyCommunities from "./pages/MyCommunities";
import Following from "./pages/Following";
import DevicesLocations from "./pages/DevicesLocations";
import { useSelector } from "react-redux";
import FallbackLoading from "./components/loader/FallbackLoading";

const AdminSignIn = lazy(() => import("./pages/AdminSignIn"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
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

      <Routes>
        <Route element={<PrivateRoute userData={userData} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/my/post/:postId" element={<SelfPost />} />
          <Route path="/community/:communityName" element={<CommunityHome />} />

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

          {/*todo: prevent moderator from accessing this page*/}
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
        <Suspense fallback={<FallbackLoading />}>
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
        </Suspense>
      </Routes>
    </>
  );
};

export default App;
