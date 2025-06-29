import express from "express";
const Router = express.Router();

// controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  createMovieReview,
  deleteMovie,
  deleteReview,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";
// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// public routes
Router.get("/all-movies", getAllMovies);
Router.get("/specific-movie/:id", getSpecificMovie);
Router.get("/new-movies", getNewMovies);
Router.get("/top-movies", getTopMovies);
Router.get("/random-movies", getRandomMovies);
// restricted routes
Router.post("/:id/review", authenticate, checkId, createMovieReview);

// admin only routes
Router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
Router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
Router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
// delete review
Router.delete("/delete-review", authenticate, authorizeAdmin, deleteReview);

export default Router;
