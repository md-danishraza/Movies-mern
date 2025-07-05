import React from "react";

function Loader() {
  return (
    <div className="animate-spin rounded-full absolute z-100 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  h-16 w-16 border-t-4 border-teal-500 border-opacity-50"></div>
  );
}

export default Loader;
