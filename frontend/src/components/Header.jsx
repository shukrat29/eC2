import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
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
            <button onClick={logoutHandler}>Logout</button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
