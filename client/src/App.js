import React from "react";
import Home from "./pages/Home";
import CommunityPage from "./pages/CommunityPage";
import Moderator from "./pages/Moderator";
import SignupForm from "./components/auth/SignupForm";
import SignIn from "./components/auth/SignIn";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PostPage from "./pages/PostPage";
import ReportPost from "./components/community/ReportPost";
import ReportedPostPage from "./pages/ReportedPostPage";
import Saved from "./pages/Saved";
import EditProfileForm from "./components/form/EditProfileForm";
const App = () => {
  return (
    <div className="bg-[#f6f7f9]">
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignIn />} />
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
          <Route
            path="/community/:communityName/moderator"
            element={<Moderator />}
          />
          <Route path="/saved" element={<Saved />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
