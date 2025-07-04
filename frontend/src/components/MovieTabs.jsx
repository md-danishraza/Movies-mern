import React from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useDeleteMovieReviewMutation } from "../redux/api/movie";
import { toast } from "react-toastify";
function MovieTabs({
  loadingMovieReviewCreation,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  movie,
  refetch,
}) {
  const [deleteReview, { isLoading: deletingReview }] =
    useDeleteMovieReviewMutation();

  const handleDelete = async (reviewId) => {
    // console.log("deleting", reviewId);
    try {
      await deleteReview({ movieId: movie._id, reviewId });
      refetch();
      toast.success("Review Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <div className="mt-8">
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler} className="p-4 border-2 rounded">
            <div className="my-2">
              <label htmlFor="comment" className="block text-xl mb-2">
                Write Your Review:
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 border rounded-lg w-full !text-amber-500 text-2xl"
              ></textarea>
            </div>
            <div className="my-2">
              <label htmlFor="rating" className=" text-xl mb-2 mr-8 ">
                Write Your Rating:
              </label>

              <input
                type="number"
                name="rating"
                id="rating"
                min={1}
                required
                className="!text-amber-500 border p-2 rounded text-2xl"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                max={10}
              />
            </div>

            <button
              type="submit"
              disabled={loadingMovieReviewCreation ? true : false}
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-800 cursor-pointer"
            >
              {loadingMovieReviewCreation ? "submitting" : "submit"}
            </button>
          </form>
        ) : (
          <p>
            Please{" "}
            <Link to="/login" className="text-blue-500 hover:text-amber-500">
              Sign In
            </Link>{" "}
            to write a review
          </p>
        )}
      </section>
      {/* showing all reviews  */}
      <section className="mt-[1rem]">
        <div>
          {movie?.reviews.length === 0 && (
            <p className="text-red-500 font-bold">No Reviews</p>
          )}
        </div>

        <div>
          {movie.reviews.length &&
            movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 rounded-lg w-full mt-[2rem]"
              >
                <div className="flex justify-between items-center ">
                  <div>
                    <strong className="text-amber-500 text-2xl ">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <IoStar key={i} className="inline" />
                      ))}
                    </strong>
                    <strong className="text-amber-500 ">
                      -{review.rating}
                    </strong>
                  </div>
                  <p className="text-[#B0B0B0]">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-4">{review.comment}</p>
                <div className="flex justify-between">
                  <strong className="text-amber-500 text-2xl">
                    {review.name}
                  </strong>
                  {userInfo?._id == review.user ? (
                    <button
                      className="bg-red-500 cursor-pointer hover:bg-red-700 px-4 py-2 rounded"
                      disabled={deletingReview ? true : false}
                      onClick={() => handleDelete(review._id)}
                    >
                      {deletingReview ? "Deleting" : "Delete"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default MovieTabs;
