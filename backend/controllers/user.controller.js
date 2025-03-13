const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe.model.js');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password') // Exclude password from response
            .populate('recipes')
            .populate('favoriteRecipes')
            .populate('followers', 'username')
            .populate('following', 'username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        const user = await User.findById(id)
            .select('-password')
            .populate('recipes')
            .populate('favoriteRecipes')
            .populate('followers', 'username')
            .populate('following', 'username');
        
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const userResponse = await User.findById(user._id)
            .select('-password');
        res.status(201).json(userResponse);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or username already exists"
            });
        }
        res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        // Check if user is modifying their own profile
        if (id !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this profile"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        .select('-password')
        .populate('recipes')
        .populate('favoriteRecipes')
        .populate('followers', 'username')
        .populate('following', 'username');

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or username already exists"
            });
        }
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        // Check if user is deleting their own account
        if (id !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to delete this account"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Personal ingredients management
const addPersonalIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        // Check if user is modifying their own ingredients
        if (id !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to modify these ingredients"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.personalIngredients.push(req.body);
        await user.save();

        res.status(200).json(user.personalIngredients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updatePersonalIngredient = async (req, res) => {
    try {
        const { id, ingredientId } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const ingredient = user.personalIngredients.id(ingredientId);
        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found"});
        }

        // Update ingredient fields
        Object.assign(ingredient, req.body);
        await user.save();

        res.status(200).json(user.personalIngredients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletePersonalIngredient = async (req, res) => {
    try {
        const { id, ingredientId } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const ingredient = user.personalIngredients.id(ingredientId);
        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found"});
        }

        ingredient.deleteOne();
        await user.save();

        res.status(200).json({
            message: "Ingredient deleted successfully",
            ingredients: user.personalIngredients
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getPersonalIngredients = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({
            ingredients: user.personalIngredients,
            count: user.personalIngredients.length
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateProfilePicture = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        // Check if user is modifying their own profile
        if (id !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this profile picture"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Create the image URL
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                profilePicture: imageUrl
            },
            { new: true }
        )
        .select('-password')
        .populate('recipes')
        .populate('favoriteRecipes')
        .populate('followers', 'username')
        .populate('following', 'username');

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUser = req.user.id;

        if (userId === currentUser) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }

        await User.findByIdAndUpdate(currentUser, { $addToSet: { following: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { followers: currentUser } });

        res.status(200).json({ message: "User followed successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUser = req.user.id;

        await User.findByIdAndUpdate(currentUser, { $pull: { following: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { followers: currentUser } });

        res.status(200).json({ message: "User unfollowed successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("followers", "username email");
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json(user.followers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("following", "username email");
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json(user.following);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
        
const toggleFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;
        
        if (!isValidObjectId(recipeId)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Check if recipe is already in favorites
        const favoriteIndex = user.favoriteRecipes.indexOf(recipeId);
        if (favoriteIndex === -1) {
            // Add to favorites
            user.favoriteRecipes.push(recipeId);
        } else {
            // Remove from favorites
            user.favoriteRecipes.splice(favoriteIndex, 1);
        }

        await user.save();

        // Return updated user with populated favorites and nested author information
        const updatedUser = await User.findById(req.user._id)
            .select('-password')
            .populate({
                path: 'recipes'
            })
            .populate({
                path: 'favoriteRecipes',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate({
                path: 'cookedRecipes',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('followers', 'username')
            .populate('following', 'username');

        res.status(200).json({
            user: updatedUser,
            isFavorited: favoriteIndex === -1 // true if we just added it, false if we just removed it
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const toggleCooked = async (req, res) => {
    try {
        const { id, recipeId } = req.params;
        
        if (!isValidObjectId(recipeId)) {
            return res.status(400).json({message: "Invalid recipe ID format"});
        }

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }

        // Check if user is modifying their own cooked recipes
        if (id !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to modify this user's cooked recipes"});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Check if recipe is already in cooked recipes
        const cookedIndex = user.cookedRecipes.indexOf(recipeId);
        if (cookedIndex === -1) {
            // Add to cooked recipes
            user.cookedRecipes.push(recipeId);
        } else {
            // Remove from cooked recipes
            user.cookedRecipes.splice(cookedIndex, 1);
        }

        await user.save();

        // Return updated user with populated fields
        const updatedUser = await User.findById(id)
            .select('-password')
            .populate('recipes')
            .populate({
                path: 'favoriteRecipes',
                populate: { path: 'author', select: 'username' }
            })
            .populate({
                path: 'cookedRecipes',
                populate: { path: 'author', select: 'username' }
            })
            .populate('followers', 'username')
            .populate('following', 'username');

        res.status(200).json({
            user: updatedUser,
            isCooked: cookedIndex === -1 // true if we just added it, false if we just removed it
        });
    } catch (error) {
        res.status(500).json({message: error.message});
>>>>>>> 3c9882faaeb3cae18bb146b00d0a949d4bd0aafe
    }
};

module.exports = {
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
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    toggleFavorite,
    toggleCooked
}; 
