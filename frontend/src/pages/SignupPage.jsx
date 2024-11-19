import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirectPath = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirectPath);
    }
  }, [userInfo, redirectPath, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await signup({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        navigate(redirectPath);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl text-center py-10">Signup</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <form onSubmit={submitHandler} className="w-full">
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Enter name"
              className="border p-2 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter email"
              className="border p-2 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter password"
              className="border p-2 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              className="border p-2 rounded-md"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="uppercase bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Signup"}
          </button>
        </form>
        <h1 className="mt-4">
          Already have an account? Click here to{" "}
          <Link to="/login">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignupPage;
