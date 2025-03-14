const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true
    },
    measure: {
        type: String
    }
});

const recipeSchema = new mongoose.Schema({
    idMeal: {
        type: String,
        unique: true,
        sparse: true,  // This allows multiple documents to have no idMeal
        default: () => `custom_${new Date().getTime()}`  // Generate a unique ID if none provided
    },

    strMeal: {
        type: String,
        required: true
    },

    strMealAlternate: String,

    strDrinkAlternate: String,

    strCategory: {
        type: String,
        required: true
    },

    strArea: String,
    strInstructions: {
        type: String,
        required: true
    },

    strMealThumb: {
        type: String,
        required: true
    },

    strTags: String,

    strYoutube: String,

    ingredients: [ingredientSchema],  // Add ingredients array

    // Legacy fields for compatibility
    strIngredient1: String,
    strIngredient2: String,
    strIngredient3: String,
    strIngredient4: String,
    strIngredient5: String,
    strIngredient6: String,
    strIngredient7: String,
    strIngredient8: String,
    strIngredient9: String,
    strIngredient10: String,
    strIngredient11: String,
    strIngredient12: String,
    strIngredient13: String,
    strIngredient14: String,
    strIngredient15: String,
    strIngredient16: String,
    strIngredient17: String,
    strIngredient18: String,
    strIngredient19: String,
    strIngredient20: String,
    strMeasure1: String,
    strMeasure2: String,
    strMeasure3: String,
    strMeasure4: String,
    strMeasure5: String,
    strMeasure6: String,
    strMeasure7: String,
    strMeasure8: String,
    strMeasure9: String,
    strMeasure10: String,
    strMeasure11: String,
    strMeasure12: String,
    strMeasure13: String,
    strMeasure14: String,
    strMeasure15: String,
    strMeasure16: String,
    strMeasure17: String,
    strMeasure18: String,
    strMeasure19: String,
    strMeasure20: String,

    strSource: String,

    strImageSource: String,

    strCreativeCommonsConfirmed: String,

    dateModified: Date,

    // Additional custom fields for our social features
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe; 