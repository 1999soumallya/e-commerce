const express = require('express');
const { RegisterUser, LoginUser, getUserProfile, updateUserProfile, SaveAddresses, GetAddresss }  = require('../Controllers/UsersController')
const { protectRoute } = require('../Middlewares/authMiddlewares')

const router = express.Router();

// User Register 
router.route('/').post(RegisterUser)

// post email, password for user login 
router.post('/login', LoginUser)

// Get User profile using private route
router.route("/profile").get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile);

// Save Address
router.post('/saveAddres', SaveAddresses);

router.get("/getAddress/:id", GetAddresss)

module.exports = router;