import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ProductListPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/product/add"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          <FaEdit className="inline-block mr-2" />
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default ProductListPage;
