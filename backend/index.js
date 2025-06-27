import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import appError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import genreRouter from "./routes/genreRoutes.js";

// connect to db
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/genre", genreRouter);

// if no url is matched
app.use((req, res, next) => {
  next(new appError("Page not found", 404));
});

// custom error handler
app.use((err, req, res, next) => {
  const { message = "something went wrong", status } = err;
  // res.send("something went wrong");
  res.status(status || 500).json({ message, status });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
