import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";

function Sliderutil({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4, // default for xl screens
    responsive: [
      {
        breakpoint: 1280, // lg
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // md
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  if (!data?.length) {
    return (
      <h1 className="text-center text-2xl text-red-500">
        No Movies with this Gerne
      </h1>
    );
  }
  return (
    <Slider {...settings} className="mx-4">
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
}

export default Sliderutil;
