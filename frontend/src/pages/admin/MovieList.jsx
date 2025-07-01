import React from "react";
import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router-dom";

function MovieList() {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container px-4 mx-auto">
      <div className="mt-4 text-xl font-bold h-12 ml-4 sm:ml-8">
        All Movies ({movies?.length})
      </div>

      <div className="mt-8 items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            className="rounded overflow-hidden shadow-lg flex flex-col h-full"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-48 object-cover"
            />
            <div className="px-6 py-4 border border-gray-300 flex-grow">
              <div className="font-bold text-xl mb-2">{movie.name}</div>
              <p className="text-teal-700 text-base">{movie.detail}</p>
            </div>
            <div className="px-6 py-4">
              <Link
                to={`/admin/movies/update/${movie._id}`}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded block text-center"
              >
                Update Movie
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
