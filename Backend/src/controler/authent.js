const User = require("../models/userData");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateData = require('../utils/validator');
const redisClient = require("../dbconnector/redis");


const registerUser = async (req, res) => {
    try {
        validateData(req.body);
        req.body.role = 'user';
        const { fullName, emailId, password, gender } = req.body;
        const hassPass = await bcrypt.hash(password, 10);
        req.body.password = hassPass;
        const user = await User.create(req.body)

        const reply = {
            fullName: user.fullName,
            emailId: user.emailId,
            _id: user._id
        }

        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: 3600 })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 3600 * 1000 })

        res.status(200).json({
            user: reply,
            message: "User register sucessfully"
        })
    }
    catch (err) {
        res.status(500).send(" some error occure in the Register " + err.message)
    }
}


const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber) {
            throw new Error("Invalid crendentials")
        }

        if (!password) {
            throw new Error("Invalid crendentials")
        }

        const user = await User.findOne({ phoneNumber: phoneNumber })
        if (!user) {
            return res.status(500).send("User does not exist")
        }

        const validatePass = await bcrypt.compare(password, user.password)

        if (!validatePass) {
            return res.status(500).send("Invalid crendentials")
        }

        const reply = {
            fullName: user.fullName,
            emailId: user.emailId,
            _id: user._id
        }

        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: 3600 })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 3600 * 1000 })
        res.status(201).json({
            user: reply,
            message: "User login sucessfully"
        })

    }
    catch (err) {
        res.status(500).send("some eroor occur in the login page" + err.message)
    }

}


const logoutUser = async (req, res) => {
    try {
        const { token } = req.cookies;

        const payload = jwt.verify(token, process.env.PRIVATE_KEY)
        await redisClient.set(`token${token}`, "Blocked")
        await redisClient.expireAt(`token:${token}`, payload.exp)

        res.cookie("token", null, { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now()) })

        res.send("logout sucesfully ")

    }
    catch (err) {
        console.log(err)
        res.send("NOt Logout till now" + err.message)
    }
}



module.exports = { registerUser, loginUser, logoutUser };