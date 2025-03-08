const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product.model.js');
const userRoutes = require('./routes/user.routes');
const recipeRoutes = require('./routes/recipe.routes');

const app = express();

app.use(express.json());

// Add routes
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
    res.send("Hello from Node API Updated 2");
});

app.get('/api/products', async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed...");
})