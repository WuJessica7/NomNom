const express = require("express");
const router = express.Router();
const { 
    getRecipes, 
    getRecipe, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe,
    toggleLike,
    addComment
} = require('../controllers/recipe.controller.js');


// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - require authentication.... will add later.
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

// Social interaction routes! Not sure if these will work as intended quite yet but here's hoping
router.post('/:id/like', toggleLike);
router.post('/:id/comment', addComment);

module.exports = router;