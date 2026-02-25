const FoodItem = require("../models/productData")
const User = require("../models/userData")


const addItem = async (req, res) => {
    try {
        // const { itemName, actualPrice, finalPrice, discoutn, desctiption, foodType, imageLink,foodAdder } = req.body
        // const foodAdder = req.result._id
        const user = await FoodItem.create(req.body);
        
        console.log("User data is here", user)
        res.send("item added sucessfully")
    }
    catch (err) {
        console.log(err)
        res.status(200).send("some error occured in the addItem" + err.message)
    }
}

const getAllItem = async (req, res) => {
    try {
        const foodData = await FoodItem.find({}).select('_id itemName finalPrice discount imageLink')
        console.log(foodData)
        res.send(foodData)
    }
    catch (err) {
        res.status(500).send("Error occured in the getall problem" + err.message)
    }
}

const deleteItem = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).send("Id is missing ")
        }

        const deletedProblem = await FoodItem.findByIdAndDelete(productId)

        if (!deletedProblem) {
            return res.status(404).send("Item is not found")
        }

        res.status(200).send("deleted sucessfully")
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("Some error in the deleted product", err.message)
    }
}


const getAllUser = async (req, res) => {
    try {
        const userData = await User.find({}).select('fullName emailId phoneNumber role')
        console.log(userData)
        res.send(userData)

    }
    catch (err) {
        res.status(501).send("Error occured ", err.message)
    }
}

const delteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send("Id is not avaible")
        }
        const delteUser = await User.findByIdAndDelete(id)

        if (!delteUser) {
            return res.status(400).send("Is is not maching ")
        }

        res.status(200).send("User deleted sucessfully")
    }
    catch (err) {

    }
}

module.exports = { addItem, getAllItem, deleteItem, getAllUser, delteUser }