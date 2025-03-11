const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addPersonalIngredient
} = require('../controllers/user.controller.js');

// Basic CRUD routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Personal ingredients route
router.post('/:id/ingredients', addPersonalIngredient);

module.exports = router; 