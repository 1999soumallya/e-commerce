const User = require("../Models/UserModel");
const SaveAddress = require("../Models/AddressModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, country, state, city, password } = req.body;
    const UserExist = await User.findOne({ email });
    if (UserExist) {
        res.status(400);
        throw new Error("User Already Exists");
    } else {
        const user = await User.create({ name, email, country, state, city, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                country: user.country,
                state: user.state,
                city: user.city,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(404);
            throw new Error("User Not Created");
        }
    }
});

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            country: user.country,
            state: user.state,
            city: user.city,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            country: user.country,
            state: user.state,
            city: user.city,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.status(201).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            country: updateUser.country,
            state: updateUser.state,
            city: updateUser.city,
            isAdmin: updateUser.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(404)
        throw new Error('User Not Found !')
    }
});

const SaveAddresses = asyncHandler(async (req, res) => {
    const { UserID, name, mobileNo, pincode, locality, address_body, country, state, city, address_type } = req.body;

    const Save_Address = await SaveAddress.create({ UserID, name, mobileNo, EmailId, pincode, locality, address_body, country, state, city, address_type })

    if (Save_Address) {
        res.status(201).json({
            _id: Save_Address._id,
            UserID: Save_Address.UserID,
            name: Save_Address.name,
            mobileNo: Save_Address.mobileNo,
            EmailId: Save_Address.EmailId,
            pincode: Save_Address.pincode,
            locality: Save_Address.locality,
            address_body: Save_Address.address_body,
            country: Save_Address.country,
            state: Save_Address.state,
            city: Save_Address.city,
            address_type: Save_Address.address_type
        })
    } else {
        res.status(404);
        throw new Error("Address Not Saved");
    }
})

const GetAddresss = asyncHandler(async (req, res) => {
    const getAddress = await SaveAddress.find({ UserID: req.params.id })

    if (getAddress) {
        res.json(getAddress);
        
    } else {
        res.status(404);
        throw new Error("Address Not Found")
    }

})

module.exports = { RegisterUser, LoginUser, getUserProfile, updateUserProfile, SaveAddresses, GetAddresss };
