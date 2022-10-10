const express = require('express');
const {GetAllProduct, GetSingleProduct} = require('../Controllers/ProductControllers')

const router = express.Router();

// Get Route for all products
router.route('/products').get(GetAllProduct)
// router.get('/products', GetAllProduct)

// Get Route for SIngle Product 
router.route('/products/:id').get(GetSingleProduct)
// router.get('/products/:id', GetSingleProduct)



module.exports = router