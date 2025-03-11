const express = require("express");
const router = express.Router();
const { authentication } = require('../middleware/auth.middleware.js');

const { 
    getRecipes, 
    getRecipe, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe,
    toggleLike,
    addComment
} = require('../controllers/recipe.controller.js');


// Public routes - anyone can view recipes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - require authentication
router.post('/', authentication, createRecipe);           // Only authenticated users can create recipes
router.put('/:id', authentication, updateRecipe);         // Only recipe author can update
router.delete('/:id', authentication, deleteRecipe);      // Only recipe author can delete

// Social interaction routes - require authentication
router.post('/:id/like', authentication, toggleLike);     // Must be logged in to like
router.post('/:id/comment', authentication, addComment);  // Must be logged in to comment

module.exports = router;