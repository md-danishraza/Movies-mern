import express from "express";
const Router = express.Router();

// controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  createMovieReview,
} from "../controllers/movieController.js";
// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// public routes
Router.get("/all-movies", getAllMovies);
Router.get("/specific-movie/:id", getSpecificMovie);
// restricted routes
Router.post("/:id/review", authenticate, checkId, createMovieReview);

// admin only routes
Router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
Router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);

export default Router;
