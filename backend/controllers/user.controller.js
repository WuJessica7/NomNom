const User = require('../models/user.model.js');
const mongoose = require('mongoose');

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

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addPersonalIngredient
}; 