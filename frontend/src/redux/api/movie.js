import { apiSlice } from "./apiSlice";

const movie_URL = "/v1/movies";
const uploads_URL = "/v1/uploads";

const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${movie_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${movie_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${movie_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${movie_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${movie_URL}/${id}/review`,
        method: "POST",
        body: { rating, comment },
      }),
    }),

    deleteMovieReview: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${movie_URL}/delete-review`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${movie_URL}/specific-movie/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${uploads_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    getNewMovies: builder.query({
      query: () => `${movie_URL}/new-movies`,
    }),

    getTopMovies: builder.query({
      query: () => `${movie_URL}/top-movies`,
    }),

    getRandomMovies: builder.query({
      query: () => `${movie_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useAddMovieReviewMutation,
  useDeleteMovieReviewMutation,
  useGetSpecificMovieQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useUploadImageMutation,
} = movieApiSlice;
