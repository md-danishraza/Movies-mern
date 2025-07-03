import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesFilter: {
    searchTerm: "",
    selectedGenre: "",
    selectedYear: "",
    selectedSort: "",
  },
  filteredMovies: [],
  movieYears: [],
  uniqueYears: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMoviesYears: (state, action) => {
      state.movieYears = action.payload;
    },
    setUniqueYears: (state, action) => {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setFilteredMovies,
  setMovieFilter,
  setMoviesYears,
  setUniqueYears,
} = movieSlice.actions;

export default movieSlice.reducer;
