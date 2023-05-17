import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { getTitleFromRoute } from "./utils/docTitle";

import PrivateRoute from "./PrivateRoute";
import ReportPost from "./components/community/ReportPost";
import EditProfileForm from "./components/form/EditProfileForm";
import CommonLoading from "./components/loader/CommonLoading";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerifiedMessage from "./pages/EmailVerifiedMessage";
import BlockDevice from "./pages/BlockDevice";
import LoginVerified from "./pages/LoginVerified";
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
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

const AdminSignIn = lazy(() => import("./pages/AdminSignIn"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

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
          <Route
            path="/devices-locations"
            element={<DevicesLocations userData={userData} />}
          />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={userData ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-screen">
                  <CommonLoading />
                </div>
              }
            >
              {adminAccessToken ? <AdminPanel /> : <AdminSignIn />}
            </Suspense>
          }
        />
        {/*todo: make them lazy*/}
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/auth/verify" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerifiedMessage />} />
        <Route path="/block-device" element={<BlockDevice />} />
        <Route path="/verify-login" element={<LoginVerified />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
