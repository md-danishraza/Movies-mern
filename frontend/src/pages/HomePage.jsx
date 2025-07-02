import React from "react";
import Header from "./movies/Header";
import MoviesContainer from "./movies/MoviesContainer";

function HomePage() {
  return (
    <div>
      <h1 className="text-center text-4xl text-amber-700">Homepage</h1>
      <Header />
      <section className="mt-8">
        <MoviesContainer />
      </section>
    </div>
  );
}

export default HomePage;
