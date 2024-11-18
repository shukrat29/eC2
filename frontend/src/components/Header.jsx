import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between p-3 border shadow-lg py-6">
      <div>
        <h1>EC2 APP</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          className="border border-slate-400 rounded-md p-2"
          type="text"
          placeholder="Search..."
        />
        <ul className="flex gap-4">
          <li>Home</li>
          <li>About Us</li>
          <li>Cart</li>
          <li>Login</li>
          <Link to="/signup">
            <li>Signup</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
