import mongoose from "mongoose";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}
const dbUrl = process.env.MONGO_URL;
if (!dbUrl) {
  console.error("No MongoDB URL found in env vars");
}

console.log(dbUrl);
const connectDB = async () => {
  let retries = 3;
  while (retries) {
    try {
      await mongoose.connect(dbUrl);
      console.log("Connected to MongoDB");
      break;
    } catch (err) {
      console.error("MongoDB connection failed, retrying...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  if (!retries) {
    console.error("MongoDB connection failed after retries");
  }
};

export default connectDB;
