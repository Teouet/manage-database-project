const express = require('express');
const app = express();
const cors = require("cors")
const multer = require("multer");
require('dotenv').config();
const PORT = process.env.PORT
const mongoose = require('mongoose')
const usersRouter = require('./controllers/user');
const { default: tradingRouter } = require('./controllers/trading');
const { default: foodRouter } = require('./controllers/food');
const { default: Config } = require('../config');
const User = require('./models/user');
const Trading = require('./models/trading');
const url = process.env.MONGODBURI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(console.log("xxxx"))
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage: fileStorage }).single("image"))
app.use('/api/user', usersRouter)
app.use("/api/trading", tradingRouter)
app.use("/api/food", foodRouter);
app.post("/admin/get-info", async (req, res) => {
    let currentMonth = new Date(new Date().getFullYear(), new Date().getMonth()).getTime()
    let countTradingMonth = await Trading.count({ date: { $gte: currentMonth } });
    let moneyTrading = countTradingMonth * 1.1;
    let moneyFood = 0;
    let countTradingFoodMonth = await Trading.find({ cardNumberReceive: "9701 0000 0000 2612", date: { $gte: currentMonth } }, (err, data) => {
        data.forEach(el => {
            moneyFood += el.money
        })
    })
    let user12Month = [];
    let trading12Month = [];
    let money12Month = [];
    for (let i = 0; i <= 11; i++) {
        let tempMoney
        let month = new Date().getMonth() - i;
        console.log("xxx month", month)
        let time
        if (month <= 0) {
            month = 12 - month;
            time = new Date(new Date().getFullYear() - 1, month).getTime()
        } else {
            time = new Date(new Date().getFullYear(), month).getTime();
        }
        console.log("xxx time", time)
        await User.count({ date: { $gte: time, $lte: time + Config.timeOneMonth } }, (err, data) => {
            user12Month.push(data)
        })
        await Trading.count({ date: { $gte: time, $lte: time + Config.timeOneMonth } }, (err, data) => {
            trading12Month.push(data)
        })
    }
    let countUserMonth = await User.count({ date: { $gte: currentMonth } })
    let result = {
        trading: countTradingMonth,
        user: countUserMonth,
        moneyTrading: moneyTrading.toFixed(3),
        moneyFood: moneyFood,
        user12Month: user12Month,
        trading12Month: trading12Month,
    }
    res.status(200).json(result).end()
})
app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}`);
})