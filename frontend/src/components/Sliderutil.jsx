import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";

function Sliderutil({ data }) {
  const settings = {
    dots: true,
    infinite: data?.length > 4, // disable infinite if not enough items
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: Math.min(data?.length, 4), // adapt to number of movies
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(data?.length, 3),
          infinite: data?.length > 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(data?.length, 2),
          infinite: data?.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: data?.length > 1,
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
