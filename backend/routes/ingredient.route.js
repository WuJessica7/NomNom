const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth.middleware.js');
const {
    getPersonalIngredients,
    addPersonalIngredient,
    removePersonalIngredient
} = require('../controllers/ingredient.controller.js');

// All routes are protected
router.use(authentication);

// Get all personal ingredients
router.get('/', getPersonalIngredients);

// Add a new personal ingredient
router.post('/', addPersonalIngredient);

// Remove a personal ingredient
router.delete('/:ingredientId', removePersonalIngredient);

module.exports = router; 