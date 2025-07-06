import React from "react";
import { useRouteError } from "react-router-dom";
import Button from "../components/Button";

function Error() {
  const error = useRouteError();
  //   console.error(error);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#ffc7ff] text-gray-800 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-2">
        {error.status === 404
          ? "The page you are looking for does not exist."
          : "An unexpected error has occurred."}
      </p>
      <p className="text-sm text-gray-600">
        {error?.statusText || error?.message}
      </p>
      <a href="/" className="mt-2">
        <Button className="bg-[#a364ff] py-2 px-4 hover:bg-[#6c35de]">
          Go Back Home
        </Button>
      </a>
    </div>
  );
}

export default Error;
