import mongoose from "mongoose";
import 'dotenv/config'
import express from "express"
import cors from "cors"
import Product from "./model.js";

mongoose.connect(process.env.MONGODB_URI)

const app = express()

app.use(cors())

app.use(express.json())

app.post('/all-products', async (req, res) => {
    try {
        // const page = parseInt(req.query.page) || 1;
        // const limit = parseInt(req.query.limit) || 5;
        const page = req.body.page || 1;
        const limit = req.body.limit || 5;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit)
        res.json(products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

app.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // const page = req.body.page || 1;
        // const limit = req.body.limit || 5;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit)
        res.json(products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, price } = req.body
        await Product.create({
            name: name,
            price: price
        })

        res.json({ message: "Product created successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Error creating Product" })
    }
})


app.listen(4000)







