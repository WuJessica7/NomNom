const authRoutes = require('./routes/auth.route.js');
const recipeRoutes = require('./routes/recipe.route.js');
const ingredientRoutes = require('./routes/ingredient.route.js');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes); 