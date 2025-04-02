import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async () => {
  try {
    const mongoUrl =
      env.MONGODB_URL || "mongodb://root:example@localhost:27017";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
