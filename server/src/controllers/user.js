const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user');
const jwt = require('jsonwebtoken');
import fs from "fs";
import path from "path";
const { getTokenFrom, addSpaceToCardNumber } = require('../../utils');
const { default: Config } = require('../../config');
usersRouter.post('/', async (request, response) => {
    let countString = fs.readFileSync(path.join(process.cwd(), "saveState.txt"), "utf-8").substring(14)
    let countNumber = parseInt(countString);
    console.log("xxx countNumberr", typeof countNumber, countNumber, countString)
    let checkUser = await User.findOne({ username: request.body.username })
    const body = request.body;
    console.log("checkUser", checkUser)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    if (checkUser) {
        return response.status(205).end()
    }
    let randomMoney = (Math.random() * 500 + 500).toFixed(3);
    let cardNumber = ""
    if (countString.length < 4) {
        for (let i = 1; i <= 4 - countString.length; i++) {
            cardNumber += "0"
        }
        cardNumber += countString
    }
    countNumber++;
    const user = {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        passwordHash,
        money: randomMoney,
        cardNumber: body.typeAccount === 2 ? "9701 0000 0000 2612" : "9701 1234 2612 " + cardNumber,
        typeAccount: body.typeAccount ? body.typeAccount : Config.MEMBER_ACCOUNT,
        date: body.typeAccount === 2 ? -1 : new Date().getTime()
    }
    var newUser = new User(user)
    await newUser.save();

    response.status(200).end();
    fs.writeFileSync(path.join(process.cwd(), "saveState.txt"), "countNumber = " + countNumber.toString())
});
usersRouter.post("/log-in", async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(req.body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.send(token).status(200).end();
})

usersRouter.post("/check-auth", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(decodedToken)
    const user = await User.findById(decodedToken.id);
    if (user) {
        return res.status(200).send("success").end()
    } else {
        return res.status(401).send("invalid").end()
    }
})
usersRouter.get("/user-info", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id);
    if (user) {
        res.status(200).send({
            username: user.username,
            cardNumber: user.cardNumber,
            money: user.money,
            fullName: user.firstName + " " + user.lastName,
            typeAccount: user.typeAccount
        })
    } else {
        res.status(401).send("failed")
    }
})
usersRouter.post("/user-fullname", async (req, res) => {
    const user = await User.findOne({ cardNumber: addSpaceToCardNumber(req.body.cardNumber) });
    if (user) {
        res.status(200).send(user.firstName + " " + user.lastName)
    } else {
        res.status(401).send("failed")
    }
})
module.exports = usersRouter