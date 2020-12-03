const foodRouter = require('express').Router()
const Food = require("../models/food")
const jwt = require('jsonwebtoken');
const path = require("path");
const readXlsxFile = require('read-excel-file/node');
foodRouter.post("/add-food", async (req, res) => {
    const body = req.body;
    console.log("xxxx", req.files)
    if (req.files) {
        req.files.forEach(async (el) => {
            let food = new Food({
                imageUrl: "/images/" + el.filename,
                name: body.name,
                description: body.description,
                price: body.price
            })
            await food.save()
        })

        return res.status(200).send(`added success food`).end();
    }
    res.status(401).end()

})
foodRouter.post("/add-multi", async (req, res) => {
    console.log("i am running")
    readXlsxFile(path.join(process.cwd(), "excels/book.xlsx")).then((rows) => {
        rows.forEach(async (el) => {
            let food = new Food({
                imageUrl: "/images/" + el[3] + ".jpg",
                name: el[0],
                description: el[1],
                price: el[2]
            })
            console.log("xxxxxx", food)
            await food.save()
        })
        return res.status(200).send(`added ${req.files.length} food`).end();
    })
    

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