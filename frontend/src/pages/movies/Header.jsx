import React from "react";
import { useGetNewMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router-dom";
import Sliderutil from "../../components/Sliderutil";

function Header() {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col mx-4 mt-8 md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 rounded md:mb-0 bg-amber-800">
        <Link
          to="/"
          className="transition duration-300 ease-in-out text-teal-500 hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200 hover:text-black  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full  mx-auto md:w-[80%]">
        <Sliderutil data={data} />
      </div>
    </div>
  );
}

export default Header;
