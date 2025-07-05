import React from "react";
import PrimaryCard from "./PrimaryCard";
import { useGetAllUsersQuery } from "../../redux/api/apiSlice";
function RealTimeCard() {
  const { data: visitors } = useGetAllUsersQuery();

  return (
    <div className="w-[30rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-[#666] my-7"></div>
      <h2 className="text-2xl font-bold mb-2">{visitors?.users?.length}</h2>
      <p className="text-gray-500 mb-2">Subscribe</p>
      <hr />

      <PrimaryCard />
    </div>
  );
}

export default RealTimeCard;
