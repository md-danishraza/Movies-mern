import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div
      key={movie._id}
      className="relative group mx-1 shadow-md hover:shadow-amber-500 "
    >
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className=" rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute top-[85%] font-bold left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
}

export default MovieCard;
