const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controler/authent");
const authRouter = express.Router();
const usermiddleware = require("../middleware/userMiddleware")

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", usermiddleware, logoutUser)
authRouter.get("/check", usermiddleware, (req, res) => {
    const reply = {
        fullName: req.result.fullName,
        emailId: req.result.emailId,
        _id: req.result._id,
        role: req.result.role,
    }

    console.log(reply)

    try {
        res.status(200).json({
            user: reply,
            message: "Valide User"
        })
    }
    catch (err) {
        console.log("error occured in check url " + err.message)
        res.status(500).send("error occured in check url " + err.message)
    }
})



module.exports = authRouter;