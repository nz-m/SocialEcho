import { lazy } from "react";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import OwnPost from "./pages/OwnPost";
import CommunityHome from "./pages/CommunityHome";
import Saved from "./pages/Saved";
import PublicProfile from "./pages/PublicProfile";
import AllCommunities from "./pages/AllCommunities";
import MyCommunities from "./pages/MyCommunities";
import Following from "./pages/Following";
import SignUp from "./pages/SignUp";

const ReportedPost = lazy(() => import("./pages/ReportedPost"));
const Moderator = lazy(() => import("./pages/Moderator"));
const DevicesLocations = lazy(() => import("./pages/DevicesLocations"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const EmailVerifiedMessage = lazy(() => import("./pages/EmailVerifiedMessage"));
const BlockDevice = lazy(() => import("./pages/BlockDevice"));
const LoginVerified = lazy(() => import("./pages/LoginVerified"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
  },
  {
    path: "/my/post/:postId",
    element: <OwnPost />,
  },
  {
    path: "/community/:communityName",
    element: <CommunityHome />,
  },
  {
    path: "/community/:communityName/reported-post",
    element: <ReportedPost />,
  },
  {
    path: "/community/:communityName/moderator",
    element: <Moderator />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/user/:userId",
    element: <PublicProfile />,
  },
  {
    path: "/communities",
    element: <AllCommunities />,
  },
  {
    path: "/my-communities",
    element: <MyCommunities />,
  },
  {
    path: "/following",
    element: <Following />,
  },
  {
    path: "/devices-locations",
    element: <DevicesLocations />,
  },
];

export const publicRoutes = [
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/auth/verify",
    element: <VerifyEmail />,
  },
  {
    path: "/email-verified",
    element: <EmailVerifiedMessage />,
  },
  {
    path: "/block-device",
    element: <BlockDevice />,
  },
  {
    path: "/verify-login",
    element: <LoginVerified />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
