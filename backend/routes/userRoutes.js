import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController.js";
// controllers

// middlewares

const userRouter = express.Router();

// register
userRouter.post("/", createUser);
// get all users by admin
userRouter.get("/", authenticate, authorizeAdmin, getAllUsers);
// login
userRouter.post("/auth", loginUser);
// logout
userRouter.post("/logout", logoutUser);

// get current user (from jwt token)
userRouter.get("/profile", authenticate, getCurrentUser);
userRouter.put("/profile", authenticate, updateCurrentUser);

export default userRouter;
