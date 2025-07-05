import React from "react";
import SecondaryCard from "./SecondaryCard";
import RealTimeCard from "./RealTimeCard";
import VideoCard from "./VideoCard";

import { useGetAllUsersQuery } from "../../redux/api/apiSlice";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../redux/api/movie";

function AdminMain() {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: allMovies } = useGetAllMoviesQuery();
  const { data: visitors } = useGetAllUsersQuery();

  const reviewsArray = allMovies?.map((m) => m.numReviews);
  const totalReviews = reviewsArray?.reduce((num, acc) => num + acc, 0);
  // console.log(totalReviews);

  return (
    <div>
      <div className="md:ml-[16rem] mt-10 flex flex-wrap justify-center">
        <SecondaryCard
          pill="Users"
          content={visitors?.users?.length}
          info="20.2k more then usual"
          gradient="from-teal-500 to-lime-400"
        />
        <SecondaryCard
          pill="Comments"
          content={totalReviews}
          info="742.8 more then usual"
          gradient="from-[#CCC514] to-[#CDCB8E]"
        />
        <SecondaryCard
          pill="Movies"
          content={allMovies?.length}
          info="372+ more then usual"
          gradient="from-green-500 to-lime-400"
        />

        <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
          <p>Top Content</p>
          <p>Reviews</p>
        </div>

        {topMovies?.map((movie) => (
          <VideoCard
            key={movie._id}
            image={movie.image}
            title={movie.name}
            date={movie.year}
            comments={movie.numReviews}
          />
        ))}
        <div>
          <RealTimeCard />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
