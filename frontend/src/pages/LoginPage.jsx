import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl text-center py-10">Login</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <form onSubmit={submitHandler} className="w-full">
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

          <button
            type="submit"
            className="uppercase bg-blue-500 text-white py-2 w-full rounded-md mt-4"
            disabled={isLoading}
          >
            Login
          </button>
          {isLoading && <Loader />}
        </form>
        <h1 className="mt-4">
          New customer? Click here to{" "}
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
            <span className="text-blue-500 cursor-pointer">Signup</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignupPage;
