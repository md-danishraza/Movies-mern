import express from "express";
import {
  createGenre,
  readGenre,
  updateGenre,
  deleteGenre,
  getGernesList,
} from "../controllers/genreController.js";
const Router = express.Router();

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

Router.get("/genres", getGernesList);
Router.post("/", authenticate, authorizeAdmin, createGenre);
Router.get("/:id", authenticate, authorizeAdmin, readGenre);
Router.put("/:id", authenticate, authorizeAdmin, updateGenre);
Router.delete("/:id", authenticate, authorizeAdmin, deleteGenre);

export default Router;
