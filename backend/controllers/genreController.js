import wrapAsync from "../utils/wrapAsync.js";
import appError from "../utils/appError.js";
import Genre from "../models/Genere.js";
export const createGenre = wrapAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new appError("name is required", 400);
  }

  const GenreExist = await Genre.findOne({ name });
  if (GenreExist) {
    throw new appError("This Genre already exists.", 409);
  }

  try {
    const newGenre = await new Genre({ name }).save();
    res.status(201).json(newGenre);
  } catch (error) {
    throw new appError("Failed to create Genre.", 500);
  }
});

export const readGenre = wrapAsync(async (req, res) => {
  const id = req.params.id;
  try {
    const genre = await Genre.findById(id);
    res.status(201).json(genre);
  } catch (error) {
    throw new appError("Failed to read Genre.", 500);
  }
});
export const updateGenre = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    throw new appError("name is required", 400);
  }
  try {
    const updated = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) {
      throw new appError("This Genre doesn't exists.", 404);
    }
    res.status(201).json(updated);
  } catch (error) {
    throw new appError("Failed to update Genre.", 500);
  }
});
export const deleteGenre = wrapAsync(async (req, res) => {
  const id = req.params.id;
  try {
    await Genre.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    throw new appError("Failed to delete Genre.", 500);
  }
});
export const getGernesList = wrapAsync(async (req, res) => {
  try {
    const genre = await Genre.find();
    res.status(200).json(genre);
  } catch (error) {
    throw new appError("Failed to get Genres.", 500);
  }
});
