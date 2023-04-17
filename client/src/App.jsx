import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const Moderator = lazy(() => import("./pages/Moderator"));
const SignupForm = lazy(() => import("./components/auth/SignupForm"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PostPage = lazy(() => import("./pages/PostPage"));
const SelfPostPage = lazy(() => import("./pages/SelfPostPage"));
const ReportPost = lazy(() => import("./components/community/ReportPost"));
const ReportedPostPage = lazy(() => import("./pages/ReportedPostPage"));
const Saved = lazy(() => import("./pages/Saved"));
const EditProfileForm = lazy(() => import("./components/form/EditProfileForm"));
const PublicProfilePage = lazy(() => import("./pages/PublicProfilePage"));
const AllCommunities = lazy(() => import("./pages/AllCommunities"));
const MyCommunities = lazy(() => import("./pages/MyCommunities"));
const Following = lazy(() => import("./pages/Following"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const EmailVerifiedMessage = lazy(() => import("./pages/EmailVerifiedMessage"));
const BlockDevice = lazy(() => import("./pages/BlockDevice"));
const LoginVerified = lazy(() => import("./pages/LoginVerified"));

const App = () => {
  const user = useSelector((state) => state.auth?.userData);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignIn />}
          />
          <Route path="/auth/verify" element={<VerifyEmail />} />
          <Route path="/email-verified" element={<EmailVerifiedMessage />} />
          <Route path="/block-device" element={<BlockDevice />} />
          <Route path="/verify-login" element={<LoginVerified />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/community/:communityName"
              element={<CommunityPage />}
            />
            <Route
              path="/community/:communityName/report"
              element={<ReportPost />}
            />
            <Route
              path="/community/:communityName/reported-post"
              element={<ReportedPostPage />}
            />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/my/post/:postId" element={<SelfPostPage />} />

            <Route
              path="/community/:communityName/moderator"
              element={<Moderator />}
            />
            <Route path="/saved" element={<Saved />} />
            <Route path="/edit-profile" element={<EditProfileForm />} />
            <Route path="/user/:userId" element={<PublicProfilePage />} />
            <Route path="/communities" element={<AllCommunities />} />
            <Route path="/my-communities" element={<MyCommunities />} />
            <Route path="/following" element={<Following />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
