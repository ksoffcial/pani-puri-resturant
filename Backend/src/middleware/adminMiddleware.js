const User = require("../models/userData");
const jwt = require("jsonwebtoken")
const redisClient = require("../dbconnector/redis")

const adminmiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(500).send("Token does not exist ")
        }

        const payload = await jwt.verify(token, process.env.PRIVATE_KEY);

        const { _id } = payload;

        if (!_id) {
            return res.status(500).send("payload is not defined")
        }

        const result = await User.findById(_id);

        if (payload.role != 'admin') {
            return res.status(500).send("Role is not admin ")
        }

        if (!result)
            throw new Error("User doesn not Exist ")

        const IsBlocked = await redisClient.exists(`token:${token}`)

        if (IsBlocked)
            throw new Error("Token is Blocked in the redis")

        req.result = result

        next();

    }
    catch (err) {
        res.status(500).send("Error occured in the admin middleware " + err.message)
    }
}


module.exports = adminmiddleware