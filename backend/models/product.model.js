// This is an example of a model file for a product API. Not intended to be used in the final project.

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        }

    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;