const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// A formality. I just like them being here to know where we are.
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Recipe = require('./models/recipe.model.js');

const productRoute = require("./routes/product.route.js");
const userRoutes = require('./routes/user.route.js');
const recipeRoutes = require('./routes/recipe.route.js');
const authRoutes = require('./routes/auth.route.js');

const app = express();

// Middleware Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Frontend 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if you need them
}));
app.use(express.json());

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/products", productRoute);
app.use("/api/recipes", recipeRoutes);

app.get('/', (req, res) => {
    res.send("Hello from Node API Updated 2");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
})
.catch(() => {
    console.log("Connection failed...");
});