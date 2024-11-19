import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc Signup user
// @route POST /api/users/signup
// @access Public
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    // generate token
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Private
const userLogin = asyncHandler(async (req, res) => {
  res.send("User login successfully");
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "logout successfully",
  });
});

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("This is your profile");
});

export { userSignUp, userLogin, userLogout, getUserProfile };
