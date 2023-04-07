import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CommunityPage from "./pages/CommunityPage";
import Moderator from "./pages/Moderator";
import SignupForm from "./components/auth/SignupForm";
import SignIn from "./components/auth/SignIn";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import PostPage from "./pages/PostPage";
import SelfPostPage from "./pages/SelfPostPage";
import ReportPost from "./components/community/ReportPost";
import ReportedPostPage from "./pages/ReportedPostPage";
import Saved from "./pages/Saved";
import EditProfileForm from "./components/form/EditProfileForm";
import PublicProfilePage from "./pages/PublicProfilePage";
import AllCommunities from "./pages/AllCommunities";
import MyCommunities from "./pages/MyCommunities";
import Following from "./pages/Following";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerifiedMessage from "./pages/EmailVerifiedMessage";

const App = () => {
  const user = useSelector((state) => state.auth?.userData);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerifiedMessage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/community/:communityName" element={<CommunityPage />} />
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
    </div>
  );
};

export default App;
