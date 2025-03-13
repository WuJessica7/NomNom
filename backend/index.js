const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// A formality. I just like them being here to know where we are.
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Recipe = require('./models/recipe.model.js');

const productRoute = require("./routes/product.route.js");
const userRoutes = require('./routes/user.route.js');
const recipeRoutes = require('./routes/recipe.route.js');
const authRoutes = require('./routes/auth.route.js');
const ingredientRoutes = require('./routes/ingredient.route.js');

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'recipe-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Middleware Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Frontend 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if you need them
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/products", productRoute);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);

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