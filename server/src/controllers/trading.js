const tradingRouter = require('express').Router()
const User = require('../models/user');
const Trading = require("../models/trading")
const jwt = require('jsonwebtoken');
const { getTokenFrom, addSpaceToCardNumber } = require('../../utils');
tradingRouter.post("/add-trading", async (req, res) => {
    console.log("xxxxx , 123", req.body.note)
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const userSend = await User.findById(decodedToken.id);
    if (userSend) {
        const userReceive = await User.findOneAndUpdate({ cardNumber: addSpaceToCardNumber(req.body.cardNumber) }, { $inc: { money: req.body.money } });
        if (userReceive) {
            await User.updateOne({ cardNumber: "9701 0000 0000 2612" }, { $inc: { money: 1.1 } })
            await User.updateOne({ _id: userSend.id }, { $inc: { money: - req.body.money - 1.1 } })
            let trading = new Trading({
                date: new Date().getTime(),
                userSendId: userSend._id,
                cardNumberReceive: userReceive.cardNumber,
                money: req.body.money,
                note: req.body.note.length > 0 ? req.body.note : userSend.firstName + " " + userSend.lastName + "chuyen tien"
            })
            await trading.save()
            return res.status(200).send("success").end();
        } else {
            return res.status(401).send("failed")
        }
    }
    return res.status(401).send("failed")
})
tradingRouter.post("/get-trading", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(req.body.dateEnd, req.body.dateFrom, decodedToken.id)
    Trading.find({ userSendId: decodedToken.id, date: { $lte: req.body.dateEnd, $gte: req.body.dateFrom }, cardNumberReceive: req.body.cardNumber })
        .then(result => {
            console.log("xxx ", result, result.length)
            res.json(result).end()
        })
})
tradingRouter.post("/get-statistical", async (req, res) => {
    Trading.find({ date: { $lte: req.body.dateEnd, $gte: req.body.dateFrom } })
})
export default tradingRouter