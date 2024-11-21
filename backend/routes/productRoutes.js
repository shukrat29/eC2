import express from "express";
import { addProduct } from "../controllers/productController.js";
import { userAuth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, adminAuth, addProduct);

export default router;
