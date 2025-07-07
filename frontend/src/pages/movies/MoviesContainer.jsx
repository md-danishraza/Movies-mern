import React, { useEffect } from "react";
import { useState } from "react";
import Sliderutil from "../../components/Sliderutil";
import Loader from "../../components/Loader";
import {
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useGetNewMoviesQuery,
} from "../../redux/api/movie";
// for genre filter
import { useFetchGenresQuery } from "../../redux/api/genre";

function MoviesContainer() {
  const { data, isLoading } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setfilteredMovies] = useState(data);

  useEffect(() => {
    setfilteredMovies((prev) => {
      return data?.filter((movie) => movie.genre === selectedGenre);
    });
  }, [selectedGenre]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col mx-4 mt-8 md:flex-row justify-between items-center md:items-start">
      <nav className="flex flex-wrap flex-row md:flex-col md:mr-4">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-1 text-sm ${
              selectedGenre === g._id ? "bg-gray-200 text-black" : ""
            }`}
            onClick={() => setSelectedGenre(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col gap-x-4 w-full  mx-auto md:w-[80%]">
        <div className="">
          <h1 className="mt-4 ml-8 mb-2">Choose Genre</h1>
          <Sliderutil data={filteredMovies} className="mx-4" />
        </div>
        <div className="">
          <h1 className="mt-4 ml-8 mb-2">Choose For You</h1>
          <Sliderutil data={randomMovies} className="mx-4" />
        </div>

        <div className="">
          <h1 className="mt-4 ml-8 mb-2">Top Movies</h1>
          <Sliderutil data={topMovies} className="mx-4" />
        </div>
      </section>
    </div>
  );
}

export default MoviesContainer;
