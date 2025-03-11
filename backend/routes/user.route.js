const express = require('express');
const router = express.Router();

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

// Basic CRUD routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Personal ingredients routes
router.get('/:id/ingredients', getPersonalIngredients);
router.post('/:id/ingredients', addPersonalIngredient);
router.put('/:id/ingredients/:ingredientId', updatePersonalIngredient);
router.delete('/:id/ingredients/:ingredientId', deletePersonalIngredient);

module.exports = router; 