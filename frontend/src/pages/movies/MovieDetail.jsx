import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movie";
function MovieDetail() {
  const { id: movieId } = useParams();
  //   each review takes movie id,rating(0-10),comment
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //   fetching current movie
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  //   current user for review
  const { userInfo } = useSelector((state) => state.auth);
  // create review mutation
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  return (
    <section className="flex flex-col w-full md:w-[80%] mx-auto px-4 ">
      <div>
        <Link
          to="/"
          className="  text-white font-semibold hover:underline hover:text-amber-500"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem] relative">
        <img src={movie?.image} alt={movie?.name} className="w-full rounded" />
        {/* rating */}
        <p className="font-bold text-amber-500 absolute right-0  ">
          Rating: {movie?.overAllRating ? movie?.overAllRating : "No rating"}
        </p>
        {/* Container One */}
        <div className="mt-8 flex justify-between flex-col md:flex-row ">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>

          <div className="mr-[1rem]">
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>

            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className="mt-[1rem]">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="container ml-[20rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div> */}
      </div>
    </section>
  );
}

export default MovieDetail;
