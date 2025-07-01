import express from "express";
import path from "path";
import multer from "multer";
// import { cloudinary, storage } from "../cloudinary";
import wrapAsync from "../utils/wrapAsync.js";
import appError from "../utils/appError.js";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/webp"
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed!"),
//       false
//     );
//   }
// };
// upload middleware
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 2MB
//   },
//   fileFilter: fileFilter,
// });

// multer
import { cloudinary, storage } from "../cloudinary/index.js";
const upload = multer({ storage });

const Router = express.Router();

Router.post(
  "/",
  upload.single("image"),
  wrapAsync(async (req, res) => {
    if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        url: `${req.file.path}`,
      });
    } else {
      throw new appError("no image provided", 404);
    }
  })
);
Router.delete(
  "/",
  upload.single("image"),
  wrapAsync(async (req, res) => {
    const { imgUrl } = req.query;
    const publicId = imgUrl.split("/").pop().split(".")[0];

    const result = await cloudinary.uploader.destroy(`Movies/${publicId}`);

    if (result.result === "not found") {
      throw new appError("Image not found or already deleted", 404);
    }

    res.sendStatus(204);
  })
);

export default Router;
