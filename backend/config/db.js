import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const dbUrl = process.env.MONGO_URL;
console.log(dbUrl);
const connectDB = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Could not connect to MongoDB", err);
      process.exit(1);
    });
};

export default connectDB;
