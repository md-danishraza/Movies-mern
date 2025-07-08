import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import path from "path";
import ExpressMongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";
import appError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import genreRouter from "./routes/genreRoutes.js";
import moviesRouter from "./routes/moviesRoutes.js";
import uploadsRouter from "./routes/uploadRoutes.js";

// connect to db
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // must match Netlify domain
    credentials: true,
  })
);

app.use(helmet());
app.use(ExpressMongoSanitize());

app.use(express.static(path.join(path.resolve(), "uploads")));
// health
app.get("/health", (req, res) => {
  res.send("OK");
});

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/genre", genreRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/uploads", uploadsRouter);

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

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port " + PORT);
});
