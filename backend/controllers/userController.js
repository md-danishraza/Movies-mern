import User from "../models/User.js";
import bcrypt from "bcryptjs";
import wrapAsync from "../utils/wrapAsync.js";
import { createToken } from "../utils/createToken.js";
import appError from "../utils/appError.js";

export const createUser = wrapAsync(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new appError(
      "All fields (username, email, password) are required.",
      400
    ); // 400: Bad Request
  }
  // returns object or null
  const userExist = await User.findOne({ email });
  if (userExist) {
    // resource conflict
    throw new appError("A user with this email already exists.", 409);
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashed });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
      email: newUser.email,
    });
  } catch (error) {
    throw new appError("Failed to create user. Please try again later.", 500);
  }
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new appError("Email and password are required.", 400);
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new appError("Invalid credentials.", 401);
  }
  if (await bcrypt.compare(password, userExist.password)) {
    // generate token
    createToken(res, userExist._id);
    res.status(200).json({
      _id: userExist._id,
      username: userExist.username,
      isAdmin: userExist.isAdmin,
      email: userExist.email,
    });
  } else {
    throw new appError("Invalid credentials.", 401);
  }
});

export const logoutUser = wrapAsync(async (req, res) => {
  // remove jwt cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully!" });
});

export const getAllUsers = wrapAsync(async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ users });
});

export const getCurrentUser = wrapAsync(async (req, res) => {
  res.status(200).json(req.user);
});
export const updateCurrentUser = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new appError("User not found.", 404);
  }

  user.username = username || user.username;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  try {
    await user.save();
    createToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } catch (error) {
    throw new appError("Failed to update user. Please try again later.", 500);
  }
});
