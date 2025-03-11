const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const productRoute = require("./routes/product.route.js");
//const userRoutes = require('./routes/user.routes');
const recipeRoutes = require('./routes/recipe.route.js');

const app = express();

// Middleware Configuration
app.use(express.json());

// Add routes, later
//app.use('/api', userRoutes);

// Add URL routing... these are routes.
app.use("/api/products", productRoute);
app.use("/api/recipes", recipeRoutes);

app.get('/', (req, res) => {
    res.send("Hello from Node API Updated 2");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed...");
});