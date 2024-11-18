import express from "express";
import {
  userSignUp,
  userLogout,
  getUserProfile,
  userLogin,
} from "../controllers/userController.js";

const router = express.Router();

// Signup user
router.post("/signup", userSignUp);

// Login user
router.post("/login", userLogin);

// Logout user
router.post("/logout", userLogout);

// get user profile
router.get("/profile", getUserProfile);

export default router;
