import React from "react";
import {
  useDeleteMovieReviewMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movie";
import { toast } from "react-toastify";

function AllComments() {
  const { data: movies, refetch, isLoading } = useGetAllMoviesQuery();
  const [deleteReview, { isLoading: deletingReview }] =
    useDeleteMovieReviewMutation();

  const handleDelete = async (movieId, reviewId) => {
    // console.log("deleting", reviewId);
    try {
      await deleteReview({ movieId, reviewId });
      refetch();
      toast.success("Review Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || error.message);
    }
  };
  if (isLoading) <div className="spinner"></div>;
  return (
    <div className="mt-4 px-4">
      <h1 className="text-2xl text-center">All comments</h1>
      <section className=" grid mt-4 gap-4 md:grid-cols-2 items-center">
        {movies?.map((movie) =>
          movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-full"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt?.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>

              <button
                className="bg-red-500 cursor-pointer hover:bg-red-700 px-4 py-2 rounded"
                disabled={deletingReview}
                onClick={() => handleDelete(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AllComments;
