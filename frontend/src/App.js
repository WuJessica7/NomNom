import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar, OtherNavigationBar } from "./NavigationBars";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import CreateAccountPage from "./CreateAccountPage";
import SingleRecipePage from "./SingleRecipePage";
import IngredientPage from "./IngredientsPage";
import Favorites from "./Favorites";
import Recipes from "./Recipes";
import CreateRecipe from "./CreateRecipe";
import Activity from "./Activity";
import Profile from "./Profile";
import EditRecipe from './EditRecipe';
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          
          <Route path="/favorites" element={
            <ProtectedRoute>
              <NavigationBar screen_name="Favorites" />
              <Favorites />
            </ProtectedRoute>
          } />

          <Route path="/recipes" element={
            <ProtectedRoute>
              <NavigationBar screen_name="Recipes" />
              <Recipes />
            </ProtectedRoute>
          } />

          <Route path="/create-recipe" element={
            <ProtectedRoute>
              <OtherNavigationBar screen_name="Create Recipe" />
              <CreateRecipe />
            </ProtectedRoute>
          } />

          <Route path="/edit-recipe/:id" element={
            <ProtectedRoute>
              <OtherNavigationBar />
              <EditRecipe />
            </ProtectedRoute>
          } />

          <Route path="/ingredients" element={
            <ProtectedRoute>
              <IngredientPage />
            </ProtectedRoute>
          } />

          <Route path="/activity" element={
            <ProtectedRoute>
              <NavigationBar screen_name="Activity" />
              <Activity />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <OtherNavigationBar screen_name="Profile" />
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/recipe" element={
            <ProtectedRoute>
              <SingleRecipePage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;