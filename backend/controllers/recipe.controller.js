const Recipe = require('../models/recipe.model.js');
const User = require('../models/user.model.js');
const mongoose = require('mongoose');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getRecipes = async (req, res) => {
    try {
        // Extract pagination parameters from query string
        const page = parseInt(req.query.page) || 1; // Default to first page
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const search = req.query.search || ''; // Get search query
        const skip = (page - 1) * limit;

        // Build search query
        const searchQuery = search
            ? {
                $or: [
                    { strMeal: { $regex: search, $options: 'i' } },
                    { strCategory: { $regex: search, $options: 'i' } },
                    { strInstructions: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        // Get total count for pagination info
        const total = await Recipe.countDocuments(searchQuery);

        // Get paginated recipes
        const recipes = await Recipe.find(searchQuery)
            .sort({ dateModified: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit)
            .populate('author', 'username')
            .populate('comments.user', 'username')
            .populate('likes', 'username');

        // Send pagination metadata along with recipes
        res.status(200).json({
            recipes,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecipes: total,
                hasNextPage: skip + limit < total,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        const recipe = await Recipe.findById(id)
            .populate('author', 'username')
            .populate('comments.user', 'username')
            .populate('likes', 'username');
        
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createRecipe = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['strMeal', 'strCategory', 'strInstructions'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Set default image URL if none provided
        const recipeData = {
            ...req.body,
            strMealThumb: req.body.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image',
            author: req.user._id,
            dateModified: new Date()
        };

        // Create the recipe
        const recipe = await Recipe.create(recipeData);

        // Add recipe to user's recipes array
        const user = await User.findById(req.user._id);
        if (!user) {
            await Recipe.findByIdAndDelete(recipe._id);
            return res.status(404).json({ message: "User not found" });
        }

        user.recipes.push(recipe._id);
        await user.save();

        const populatedRecipe = await Recipe.findById(recipe._id)
            .populate('author', 'username');

        res.status(201).json(populatedRecipe);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "Recipe with this ID already exists"});
        }
        res.status(500).json({message: error.message});
    }
}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        // Check if user is the author
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this recipe"});
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                ...req.body,
                dateModified: new Date()
            },
            { new: true }
        )
        .populate('author', 'username')
        .populate('comments.user', 'username')
        .populate('likes', 'username');

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        // Check if user is the author
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to delete this recipe"});
        }

        await Recipe.findByIdAndDelete(id);
        res.status(200).json({message: "Recipe deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Social feature controllers
const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const likeIndex = recipe.likes.indexOf(req.user._id);
        if (likeIndex === -1) {
            recipe.likes.push(req.user._id);
        } else {
            recipe.likes.splice(likeIndex, 1);
        }

        await recipe.save();
        
        const updatedRecipe = await Recipe.findById(id)
            .populate('author', 'username')
            .populate('comments.user', 'username')
            .populate('likes', 'username');

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        if (!text || text.trim().length === 0) {
            return res.status(400).json({message: "Comment text is required"});
        }

        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        recipe.comments.push({
            user: req.user._id,
            text,
            createdAt: new Date()
        });

        await recipe.save();
        
        const updatedRecipe = await Recipe.findById(id)
            .populate('author', 'username')
            .populate('comments.user', 'username')
            .populate('likes', 'username');
        
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateRecipeImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        // Check if user is the author
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this recipe"});
        }

        // Create the image URL
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                strMealThumb: imageUrl,
                dateModified: new Date()
            },
            { new: true }
        )
        .populate('author', 'username')
        .populate('comments.user', 'username')
        .populate('likes', 'username');

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleLike,
    addComment,
    updateRecipeImage
};