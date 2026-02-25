const mongoose = require("mongoose");
const { Schema } = require('mongoose')

const productSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        minLenght: 4,
        maxLength: 30
    },
    actualPrice: {
        type: Number,
        required: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    descritiption: {
        type: String,
        required: true,
        minLenght: 10,
        maxLength: 300,
    },
    foodType: {
        type: String,
        enum: ["veg", "non-veg", "egg"]
    },
    imageLink: {
        type: String,
        required: true,
    },
    foodAdder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }

}, { timestamps: true })

const FoodItem = mongoose.model("foodDetails", productSchema)

module.exports = FoodItem