const foodRouter = require('express').Router()
const Food = require("../models/food")
const jwt = require('jsonwebtoken');
const path = require("path");
foodRouter.post("/add-food", async (req, res) => {
    const body = req.body
    if (req.file) {
        let food = new Food({
            imageUrl: "/images/" + req.file.filename,
            name: body.name,
            description: body.description,
            price: body.price
        })
        await food.save()
        console.log("xxxx food", food)
        return res.status(200).json(food).end();
    }
    res.status(401).end()

})
foodRouter.get("/get-all-food", async (req, res) => {
    let foods = await Food.find({});
    res.status(200).json(foods).end()
})
foodRouter.get("/images/:name", async (req, res) => {
    res.sendFile(path.join(process.cwd(), `/images/${req.params.name}`))
})
foodRouter.post("/save-list-food", async (req, res) => {
    let body = req.body;
    body.forEach(async (el) => {
        await Food.findByIdAndDelete(el)

    })
    console.log("xxx running");
    res.status(200).send("success").end()
})

export default foodRouter