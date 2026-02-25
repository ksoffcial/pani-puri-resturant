const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "foodDetails"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]



}, { timestamps: true })

const CartItem = mongoose.model("cart", cartSchema)

module.exports = CartItem;