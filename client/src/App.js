import React from "react";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
};

export default App;
