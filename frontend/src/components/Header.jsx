import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Admin Dropdown
  const toggleAdminMenu = () => {
    setIsAdminMenuOpen((prev) => !prev);
  };

  // Toggle Hamburger Menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between p-3 border shadow-lg py-6">
      <div>
        <h1 className="font-bold text-2xl text-red-600">TechStore</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search input remains always visible */}
        <input
          className="border border-slate-400 rounded-md p-2"
          type="text"
          placeholder="Search..."
        />

        {/* Home link remains always visible */}
        <Link to="/" className="hidden sm:block">
          <li>Home</li>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button className="sm:hidden text-2xl" onClick={toggleMenu}>
          ☰
        </button>

        {/* Menu items (only visible when hamburger is open) */}
        <ul
          className={`sm:flex gap-4 ${
            isMenuOpen ? "block" : "hidden"
          } absolute sm:static top-16 left-0 bg-white sm:bg-transparent w-full sm:w-auto shadow-lg sm:shadow-none`}
        >
          <Link to="/cart">
            <li>Cart</li>
          </Link>
          {!userInfo ? (
            <>
              <Link to="/signup">
                <li>Signup</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </>
          ) : (
            <>
              <button onClick={logoutHandler}>Logout</button>

              {/* Admin Dropdown */}
              {userInfo.isAdmin && (
                <div className="relative">
                  <button
                    className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={toggleAdminMenu}
                  >
                    Admin
                  </button>

                  {isAdminMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Orders
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
