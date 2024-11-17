import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(`Errot: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
