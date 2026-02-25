const CartItem = require("../models/Cart");
const mongoose = require("mongoose")


const addOnCart = async (req, res) => {
    const productId = req.params.pid;
    const userId = req.result._id;

    let cart = await CartItem.findOne({ userId: userId });

    if (!cart) {
        await CartItem.create({ userId: userId, items: [{ product: productId, quantity: 1 }] })
    } else {
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
    }
    res.status(201).json({ message: "Item added successfully", cart });
}

const removeOnCart = async (req, res) => {
    try {
        const userId = req.result._id;
        const productId = req.params.pid;

        console.log("userid is here",userId)
        console.log(productId)
        let cart = await CartItem.findOne({ userId: userId });

        if (!cart) {
            return res.send("Cart not found")
        }

        cart.items = cart.items.filter(
            item => item._id.toString() !== productId.toString()
        );

        await cart.save();

        res.status(201).json({ message: "Item deleted sucessfully", cart });

    }
    catch (err) {
        res.status(500).send("Error occured to remove data ", err.message)
    }
}

const cartDetails = async (req, res) => {
    try {
        const userId = req.result._id;

        const cartData = await CartItem.find({ userId: new mongoose.Types.ObjectId(userId) }).populate({
            path: "items.product",
            select: "_id itemName imageLink actualPrice finalPrice"
        })
        console.log("cart data is here ", cartData)

        res.send(cartData)

    }
    catch (err) {
        res.status(404).send("some eror to get details " + err.message)
    }


}

module.exports = { addOnCart, removeOnCart, cartDetails };