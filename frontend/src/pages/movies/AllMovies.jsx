import React from "react";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import MovieCard from "../../components/MovieCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import Loader from "../../components/Loader";

import {
  setMovieFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
} from "../../redux/features/movie/moviesSlice";

function AllMovies() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();

  // getting movies state
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));
  //   console.log(movieYears, uniqueYears);

  //   setting initial data for state
  useEffect(() => {
    // all movies
    dispatch(setFilteredMovies(data || []));
    // all years
    dispatch(setMoviesYears(movieYears));
    // unique years
    dispatch(setUniqueYears(uniqueYears));
  }, [dispatch, data]);

  //   search term change
  const handleSearchChange = (e) => {
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredMovies(filteredMovies));
    // update the searchTerm filter state
    dispatch(setMovieFilter({ searchTerm: e.target.value }));
  };

  //   filter by genre
  const handleGenreClick = (genreId) => {
    if (!genreId) {
      dispatch(setFilteredMovies(data));
      // update the filters
      dispatch(setMovieFilter({ selectedGenre: "" }));
      return;
    }
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
    // update the filters
    dispatch(setMovieFilter({ selectedGenre: genreId }));
  };
  //   filter by year
  const handleYearChange = (year) => {
    if (!year) {
      dispatch(setFilteredMovies(data));
      // update the filters
      dispatch(setMovieFilter({ selectedYear: "" }));
      return;
    }
    const filterByYear = data.filter((movie) => movie.year == year);
    dispatch(setFilteredMovies(filterByYear));
    // update the filters
    dispatch(setMovieFilter({ selectedYear: year }));
  };

  //   sort change
  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        // update the sort filters
        dispatch(setMovieFilter({ selectedSort: sortOption }));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        // update the sort filters
        dispatch(setMovieFilter({ selectedSort: sortOption }));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        dispatch(setMovieFilter({ selectedSort: sortOption }));
        break;

      default:
        // no sort
        dispatch(setFilteredMovies(data));
        dispatch(setMovieFilter({ selectedSort: "" }));
        break;
    }
  };
  return (
    <div className="flex flex-col mx-4 items-center">
      <div
        className="relative h-[40rem] w-screen flex justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
        <div className="relative z-10  text-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold mb-4  bg-clip-text ">
            {" "}
            Movies Info
          </h1>
          <p className="text-2xl px-8">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>

        <section className="absolute px-4 bottom-[5rem] flex flex-col flex-wrap gap-x-4 justify-center items-center z-20">
          <input
            type="text"
            className="w-[80%]  h-[5rem] border-white border-1  text-2xl text-center !text-white  font-bold focus:outline-none focus:ring-2 focus:ring-red-500 px-10 outline-none rounded"
            placeholder="Search Movie"
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
          />
          <section className="mt-[2rem] flex flex-wrap items-center gap-4 justify-center ">
            <select
              className="border p-2 rounded text-white"
              value={moviesFilter.selectedGenre}
              onChange={(e) => handleGenreClick(e.target.value)}
            >
              <option value="">Genres</option>
              {genres?.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded ml-4 text-white"
              value={moviesFilter.selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">Year</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded ml-4 text-white"
              value={moviesFilter.selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="new">New Movies</option>
              <option value="top">Top Movies</option>
              <option value="random">Random Movies</option>
            </select>
          </section>
        </section>
      </div>

      <section className="mt-[1rem] w-screen px-4 grid gap-4 md:grid-cols-2 items-center">
        {isLoading ? (
          <Loader />
        ) : (
          filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        )}
      </section>
    </div>
  );
}

export default AllMovies;
