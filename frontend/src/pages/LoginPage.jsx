import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl text-center py-10">Login</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <form className="w-full">
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
            // disabled={isLoading}
          >
            Login
          </button>
        </form>
        <h1 className="mt-4">
          New customer? Click here to{" "}
          <Link to="/signup">
            <span className="text-blue-500 cursor-pointer">Signup</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignupPage;
