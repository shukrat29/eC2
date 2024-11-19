import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-col max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl text-center py-10">Signup</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <form className="w-full">
          <div className="flex flex-col">
            <label>Name:</label>
            <input
              type="text"
              placeholder="enter name"
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type="text"
              placeholder="enter name"
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label>Password:</label>
            <input
              type="text"
              placeholder="enter name"
              className="border p-2 rounded-md"
            />
          </div>
          <button className="uppercase">signup</button>
        </form>
        <h1>
          Already have an account? click here to{" "}
          <Link to="/login">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignupPage;
