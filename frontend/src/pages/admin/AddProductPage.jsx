import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUploadProductImageMutation,
  useAddProductMutation,
} from "../../slices/productsApiSlice";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [addProduct, { isLoading: addProductLoading, error }] =
    useAddProductMutation();
  const [uploadProductImage, { isLoading: imageUploading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to add a new product?")) {
      try {
        await addProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }).unwrap();
        toast.success("Product added successfully");
        navigate("/admin/productlist");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Link
        to="/admin/productlist"
        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mb-4"
      >
        Go Back
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {addProductLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 mb-4">
            {error.data?.message || "An unexpected error occurred"}
          </div>
        ) : (
          <form onSubmit={addProductHandler}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Image
              </label>
              <input
                id="image"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="file"
                className="mt-2"
                onChange={uploadFileHandler}
              />
              {imageUploading && (
                <div className="text-center">Uploading...</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="brand">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="countInStock"
              >
                Count In Stock
              </label>
              <input
                id="countInStock"
                type="number"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Add Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
