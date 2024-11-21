import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Create a products
// @route POST /api/products
// @access Private/ Admin

const addProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, price, brand, category, countInStock, description, image } =
    req.body;

  if (
    !name ||
    !price ||
    !image ||
    !brand ||
    !category ||
    !countInStock ||
    !description
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const product = new Product({
    name,
    price,
    user: req.user._id, // assuming authentication middleware
    image, // direct URL from the request
    brand,
    category,
    countInStock,
    description,
    numReviews: 0,
  });

  const addedProduct = await product.save();
  res.status(201).json(addedProduct);
});

export { addProduct };
