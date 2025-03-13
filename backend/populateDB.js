require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Recipe = require('./models/recipe.model.js');
const User = require('./models/user.model.js');
const bcrypt = require('bcryptjs');

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1';

// Helper function to extract ingredients from MealDB format
const getIngredientsFromMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }
    return ingredients;
};

// Function to fetch recipes by first letter
const fetchRecipesByLetter = async (letter) => {
    try {
        const response = await fetch(`${MEALDB_API_URL}/search.php?f=${letter}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error(`Error fetching recipes for letter ${letter}:`, error);
        return [];
    }
};

// Main function to populate database
const populateDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create or find the Unknown Chef user
        let unknownChef = await User.findOne({ username: 'Unknown Chef' });
        if (!unknownChef) {
            // Generate a secure random password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
            
            unknownChef = await User.create({
                username: 'Unknown Chef',
                email: 'unknown@nomnom.com',
                password: hashedPassword
            });
            console.log('Created Unknown Chef user');
        }

        // Fetch recipes for letters A-C only
        const letters = ['a', 'b', 'c'];
        let totalRecipes = 0;

        for (const letter of letters) {
            console.log(`Fetching recipes starting with ${letter.toUpperCase()}...`);
            const meals = await fetchRecipesByLetter(letter);
            
            for (const meal of meals) {
                // Check if recipe already exists
                const existingRecipe = await Recipe.findOne({ idMeal: meal.idMeal });
                if (existingRecipe) {
                    console.log(`Recipe ${meal.strMeal} already exists, skipping...`);
                    continue;
                }

                // Create new recipe
                const recipe = new Recipe({
                    idMeal: meal.idMeal,
                    strMeal: meal.strMeal,
                    strCategory: meal.strCategory || 'Uncategorized',
                    strArea: meal.strArea || 'Unknown',
                    strInstructions: meal.strInstructions,
                    strMealThumb: meal.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image',
                    strYoutube: meal.strYoutube,
                    ingredients: getIngredientsFromMeal(meal),
                    author: unknownChef._id,  // Set Unknown Chef as the author
                    dateModified: new Date(),
                    likes: [],
                    comments: []
                });

                await recipe.save();
                totalRecipes++;
                console.log(`Saved recipe: ${meal.strMeal}`);
            }
        }

        console.log(`Successfully populated database with ${totalRecipes} recipes!`);
        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

// Run the population script
populateDatabase(); 