const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth.middleware.js');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addPersonalIngredient,
    updatePersonalIngredient,
    deletePersonalIngredient,
    getPersonalIngredients
} = require('../controllers/user.controller.js');

// Public routes
router.get('/', getUsers);         // List users can be public
router.get('/:id', getUser);       // Viewing a profile can be public

// Protected routes - require authentication
router.put('/:id', authentication, updateUser);           // Only authenticated user can update their profile
router.delete('/:id', authentication, deleteUser);        // Only authenticated user can delete their account

// Personal ingredients - all protected
router.get('/:id/ingredients', authentication, getPersonalIngredients);
router.post('/:id/ingredients', authentication, addPersonalIngredient);
router.put('/:id/ingredients/:ingredientId', authentication, updatePersonalIngredient);
router.delete('/:id/ingredients/:ingredientId', authentication, deletePersonalIngredient);

module.exports = router; 