import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  //   console.error(error);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-red-500 text-center">
      <h1 className="text-4xl font-bold mb-4  ">Oops!</h1>
      <p className="text-lg mb-2">
        {error.status === 404
          ? "The page you are looking for does not exist."
          : "An unexpected error has occurred."}
      </p>
      <p className="text-sm  ">{error?.statusText || error?.message}</p>
      <a href="/" className="mt-2">
        <button className="bg-[#a364ff] py-2 px-4 hover:bg-[#6c35de] cursor-pointer text-white">
          Go back Home.
        </button>
      </a>
    </div>
  );
}

export default Error;
