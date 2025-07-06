import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS (works on Netlify + Render)
    sameSite: "None", // equired for cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  });

  return token;
};
