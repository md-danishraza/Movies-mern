import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const authenticate = wrapAsync(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    throw new appError("Authentication required: no token provided.", 401);
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      // adding user to request object
      try {
        req.user = await User.findById(decoded.userId).select("-password");
      } catch (error) {
        throw new appError("User not found.", 404);
      }

      // call the next middleware
      next();
    } catch (error) {
      throw new appError("Invalid or expired token.", 403); // 403: forbidden due to bad token
    }
  }
});

// checkAdmin after authenticate middleware
export const authorizeAdmin = wrapAsync(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // allow
    next();
  } else {
    // deny
    throw new appError("Access denied: admin privileges required.", 403);
  }
});
