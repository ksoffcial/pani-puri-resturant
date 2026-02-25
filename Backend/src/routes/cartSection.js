const express = require("express")
const cartRouter = express.Router();
const usermiddleware = require("../middleware/userMiddleware");
const { addOnCart, cartDetails, removeOnCart } = require("../controler/cartFxn");


cartRouter.post('/addItem/:pid',usermiddleware,addOnCart);
cartRouter.get('/cartDetails',usermiddleware,cartDetails);
cartRouter.delete('/remove/:pid',usermiddleware,removeOnCart)


module.exports = cartRouter;