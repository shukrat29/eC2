import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between p-3 border shadow-lg py-6">
      <div>
        <h1 className="font-bold text-2xl text-red-600">TechStore</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          className="border border-slate-400 rounded-md p-2"
          type="text"
          placeholder="Search..."
        />
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <li>About Us</li>
          <li>Cart</li>
          <Link to="/signup">
            <li>Signup</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
