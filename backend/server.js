import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("You are getting this message from server");
});

app.listen(port, (req, res) => {
  console.log(`Server running successfully on port ${port}`);
});
