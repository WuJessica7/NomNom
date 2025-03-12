const express = require("express");
const router = express.Router();
const { authentication } = require('../middleware/auth.middleware.js');
const multer = require('multer');
const path = require('path');

const { 
    getRecipes, 
    getRecipe, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe,
    toggleLike,
    addComment,
    updateRecipeImage
} = require('../controllers/recipe.controller.js');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'recipe-' + Date.now() + path.extname(file.originalname));
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

// Public routes - anyone can view recipes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - require authentication
router.post('/', authentication, createRecipe);           // Only authenticated users can create recipes
router.put('/:id', authentication, updateRecipe);         // Only recipe author can update
router.delete('/:id', authentication, deleteRecipe);      // Only recipe author can delete

// Image upload route
router.post('/:id/image', authentication, upload, updateRecipeImage);

// Social interaction routes - require authentication
router.post('/:id/like', authentication, toggleLike);     // Must be logged in to like
router.post('/:id/comment', authentication, addComment);  // Must be logged in to comment

module.exports = router;