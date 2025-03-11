import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Recipes from "./pages/Recipes";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Ingredients from "./pages/Ingredients"; // 새 페이지

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ingredients" element={<Ingredients />} />
      </Routes>
    </div>
  );
};

export default App;