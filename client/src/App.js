import React from "react";
import Home from "./pages/Home";
import CommunityPage from "./pages/CommunityPage";
import Moderator from "./pages/Moderator";
import SignupForm from "./components/auth/SignupForm";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-[#f6f7f9]">
       <Routes>
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/community/:id" element={<CommunityPage />} />
      <Route path="/community/moderator" element={<Moderator />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </div>
 
  );
};

export default App;
