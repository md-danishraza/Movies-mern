import { apiSlice } from "./apiSlice";

const Genre_URL = "/v1/genre";

const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${Genre_URL}`,
        method: "post",
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${Genre_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${Genre_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    fetchGenres: builder.query({
      query: () => `${Genre_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} = genreApiSlice;
