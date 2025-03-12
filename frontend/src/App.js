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
    //<OtherNavigationBar />
    //<MainPageNavigationBar />
    //<NavigationBar screen_name="Favorites" />
    //<SignInPage />
    //<CreateAccountPage />
    
    <Router>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/favorites" element={<NavigationBar screen_name="Favorites" />} />
        <Route path="/recipes" element={<NavigationBar screen_name="Recipes" />} />
        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="/activity" element={<NavigationBar screen_name="Activity" />} />
        <Route path="/profile" element={<OtherNavigationBar />} />
        <Route path="/recipe" element={<SingleRecipePage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

    </Router>


  );

}

export default App