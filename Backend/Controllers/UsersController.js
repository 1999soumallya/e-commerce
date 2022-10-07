const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const generatetoken = require("../utils/generatetoken");

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const UserExist = await User.findOne({ email });
    if (UserExist) {
        res.status(400);
        throw new Error("User Already Exists");
    } else {
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({ token: generatetoken(user._id) });
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
        res.json({ token: generatetoken(user._id) });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            IsAdmin: user.IsAdmin,
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
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            IsAdmin: updateUser.IsAdmin,
            token: generatetoken(updateUser._id)
        });
    } else {
        res.status(404)
        throw new Error('User Not Found !')
    }
});

module.exports = { RegisterUser, LoginUser, getUserProfile, updateUserProfile };
