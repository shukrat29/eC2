import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

// Allow specific origins
app.use(cors({ origin: "http://localhost:5173" }));

const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server running successfully on port ${port}`);
});
