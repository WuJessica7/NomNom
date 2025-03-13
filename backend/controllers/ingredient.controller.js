const User = require('../models/user.model.js');

// Get all personal ingredients for a user
const getPersonalIngredients = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Ensure we always return an array, even if personalIngredients is undefined
        res.status(200).json({
            ingredients: user.personalIngredients || [],
            count: (user.personalIngredients || []).length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new personal ingredient
const addPersonalIngredient = async (req, res) => {
    try {
        const { name, quantity, expirationDate } = req.body;

        if (!name || !quantity || !expirationDate) {
            return res.status(400).json({ message: 'Please provide name, quantity, and expiration date' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Initialize personalIngredients array if it doesn't exist
        if (!user.personalIngredients) {
            user.personalIngredients = [];
        }
        
        user.personalIngredients.push({
            name,
            quantity,
            expirationDate: new Date(expirationDate)
        });

        await user.save();
        res.status(201).json({
            ingredients: user.personalIngredients,
            count: user.personalIngredients.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a personal ingredient
const removePersonalIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Handle case where personalIngredients might be undefined
        if (!user.personalIngredients) {
            return res.status(200).json({
                ingredients: [],
                count: 0
            });
        }

        user.personalIngredients = user.personalIngredients.filter(
            ingredient => ingredient._id.toString() !== ingredientId
        );

        await user.save();
        res.status(200).json({
            ingredients: user.personalIngredients,
            count: user.personalIngredients.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPersonalIngredients,
    addPersonalIngredient,
    removePersonalIngredient
}; 