import { isValidObjectId } from "mongoose";
import appError from "../utils/appError.js";

export default function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    throw new appError(`Invalid object of ${req.params.id}`, 404);
  }
  next();
}
