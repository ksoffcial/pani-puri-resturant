const express = require("express");
const adminRouter = express.Router()
const adminmiddleware = require("../middleware/adminMiddleware");
const { addItem, getAllItem, deleteItem, getAllUser, delteUser } = require("../controler/adminfxn");


adminRouter.post('/create', adminmiddleware, addItem)
adminRouter.get('/getallitem', adminmiddleware, getAllItem)
adminRouter.delete('/deleteItem/:productId', adminmiddleware, deleteItem)
adminRouter.get("/getAllUser", adminmiddleware, getAllUser);
adminRouter.delete('/deleteUser/:id', adminmiddleware, delteUser)
adminRouter.get('/getallFood',getAllItem)


module.exports = adminRouter