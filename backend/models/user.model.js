const mongoose = require('mongoose');

const personalIngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    quantity: Number,

    unit: String,

    purchaseDate: {
        type: Date,
        default: Date.now
    },

    expirationDate: Date,

    notes: String
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    profilePicture: {
        type: String,
        default: 'default-profile.png' // TODO Change to a default profile picture
    },

    introduction: {
        type: String,
        maxLength: 500
    },

    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],

    favoriteRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],

    cookedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        default: []
    }],

    personalIngredients: {
        type: [personalIngredientSchema],
        default: []
    },

    joinedDate: {
        type: Date,
        default: Date.now
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});


const User = mongoose.model('User', userSchema);
module.exports = User; 