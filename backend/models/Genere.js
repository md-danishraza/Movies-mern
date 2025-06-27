import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxLength: 32,
  },
});

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
