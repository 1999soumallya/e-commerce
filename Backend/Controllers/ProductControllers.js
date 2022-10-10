const ProductModel = require('../Models/ProductModel');
const asynchandler = require('express-async-handler');

const GetAllProduct = asynchandler(async (req, res) => {
    const Products = await ProductModel.find({})
    res.json(Products);
})

const GetSingleProduct = asynchandler(async (req, res) => {
    const SingleProduct = await ProductModel.findById(req.params.id)
    if (SingleProduct) {
        res.json(SingleProduct)
    } else {
        res.send(404).json({ message: "Product Not Found" });
    }
})


module.exports = { GetAllProduct, GetSingleProduct }