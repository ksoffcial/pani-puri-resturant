const express = require("express")
const main = require("./dbconnector/database")
const redisClient = require("./dbconnector/redis")
const authRouter = require("./routes/authecantion")
const cookieParser = require('cookie-parser')
const app = express()
require("dotenv").config()
const cors = require("cors")
const adminRouter = require("./routes/adminRouter")
const cartRouter = require("./routes/cartSection")


app.use(cors({
    origin: ['http://localhost:5173',
        'https://pani-puri-resturant.vercel.app'],
    credentials: true
}))

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/user", authRouter)
app.use("/admin",adminRouter)
app.use('/cart',cartRouter)



const initilizeConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()])
        console.log("DataBase is connected sucessfully....")
        app.listen(process.env.PROT_NUM, () => {
            console.log("port is Listening ....")
        })
    }
    catch (err) {
        console.log("some error occured ", err.message)
    }
}

initilizeConnection();