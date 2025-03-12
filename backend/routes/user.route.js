const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth.middleware.js');
const multer = require('multer');
const path = require('path');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addPersonalIngredient,
    updatePersonalIngredient,
    deletePersonalIngredient,
    getPersonalIngredients,
    updateProfilePicture,
    toggleFavorite
} = require('../controllers/user.controller.js');

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('image');

// Public routes
router.get('/', getUsers);         // List users can be public
router.get('/:id', getUser);       // Viewing a profile can be public

// Protected routes - require authentication
router.put('/:id', authentication, updateUser);           // Only authenticated user can update their profile
router.delete('/:id', authentication, deleteUser);        // Only authenticated user can delete their account

// Profile picture upload route
router.post('/:id/profile-picture', authentication, upload, updateProfilePicture);

// Personal ingredients - all protected
router.get('/:id/ingredients', authentication, getPersonalIngredients);
router.post('/:id/ingredients', authentication, addPersonalIngredient);
router.put('/:id/ingredients/:ingredientId', authentication, updatePersonalIngredient);
router.delete('/:id/ingredients/:ingredientId', authentication, deletePersonalIngredient);

// Favorite routes
router.post('/:id/favorites/:recipeId', authentication, toggleFavorite);

module.exports = router; 