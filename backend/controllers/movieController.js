import Movie from "../models/Movie.js";
import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";

export const createMovie = wrapAsync(async (req, res) => {
  try {
    const newMovie = await Movie.insertOne(req.body);
    res.json(newMovie);
  } catch (error) {
    console.log(error);
    throw new appError("failed to create movie", 500);
  }
});
export const getAllMovies = wrapAsync(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
    throw new appError("failed to find movies", 500);
  }
});
export const getNewMovies = wrapAsync(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    console.log(error);
    throw new appError("failed to find movies", 500);
  }
});
export const getTopMovies = wrapAsync(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ numReviews: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    console.log(error);
    throw new appError("failed to find movies", 500);
  }
});
export const getRandomMovies = wrapAsync(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(movies);
  } catch (error) {
    console.log(error);
    throw new appError("failed to find movies", 500);
  }
});
export const getSpecificMovie = wrapAsync(async (req, res) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findById(id);
    if (!movie) {
      throw new appError("movie not found", 404);
    }
    res.json(movie);
  } catch (error) {
    console.log(error);
    throw new appError("failed to find movie", 500);
  }
});
export const updateMovie = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const movie = await Movie.findById(id);
  if (!movie) {
    throw new appError("Movie not found", 404);
  }

  const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  res.json(updatedMovie);
});
export const deleteMovie = wrapAsync(async (req, res) => {
  const id = req.params.id;

  try {
    await Movie.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    throw new appError("failed to delete movie", 500);
  }
});
export const createMovieReview = wrapAsync(async (req, res) => {
  //   console.log(req.user);

  const { rating, comment } = req.body;
  if (rating < 1 || rating > 10) {
    throw new appError("Rating must be between 1 and 10", 400);
  }

  const movie = await Movie.findById(req.params.id);

  // check if movie is already reviewed by that user
  if (movie) {
    const reviewed = movie.reviews.find((r) => {
      return r.user.toString() === req.user._id.toString();
    });
    if (reviewed) throw new appError("movie is already reviewed", 409);
  } else {
    throw new appError("movie not found", 404);
  }

  // create and push new review to that movie
  const review = {
    name: req.user.username,
    user: req.user._id,
    rating: rating,
    comment: comment,
  };
  movie.reviews.push(review);

  // increase num of review count
  movie.numReviews = movie.reviews.length;

  // update rating
  movie.overAllRating =
    movie.reviews.reduce((acc, r) => r.rating + acc, 0) / movie.numReviews;
  try {
    await movie.save();
    res.status(201).json({
      message: "Review added successfully",
      review,
      overAllRating: movie.overAllRating,
      numReviews: movie.numReviews,
    });
  } catch (error) {
    console.log(error);
    throw new appError("failed to create review", 500);
  }
});

export const deleteReview = wrapAsync(async (req, res) => {
  const { movieId, reviewId } = req.body;

  const movie = await Movie.findById(movieId);
  if (!movie) throw new appError("Movie not found", 404);
  // to remove and item from an array findIndex + splice
  // array method to find index takes boolean
  const reviewIndex = movie.reviews.findIndex(
    (review) => review._id.toString() === reviewId
  );

  if (reviewIndex === -1) {
    throw new appError("Review not found", 404);
  }

  // Remove the review
  movie.reviews.splice(reviewIndex, 1);

  // Update review count
  movie.numReviews = movie.reviews.length;

  // Update average rating
  movie.overAllRating =
    movie.numReviews > 0
      ? movie.reviews.reduce((acc, r) => r.rating + acc, 0) / movie.numReviews
      : 0;

  try {
    await movie.save();
    res.status(200).json({
      message: "Review deleted successfully",
      numReviews: movie.numReviews,
      overAllRating: movie.overAllRating,
    });
  } catch (error) {
    console.error(error);
    throw new appError("Failed to delete review", 500);
  }
});
