import React from "react";
import { NavigationBar, MainPageNavigationBar, OtherNavigationBar } from "./NavigationBars"
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage"
import CreateAccountPage from "./CreateAccountPage"
import SingleRecipePage from "./SingleRecipePage";
import IngredientPage from "./IngredientsPage";
import Favorites from "./Favorites";
import Recipes from "./Recipes";
import Activity from "./Activity";
import Profile from "./Profile";


function App() {
  return(    
    <Router>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe" element={<SingleRecipePage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

    </Router>


  );

}

export default App