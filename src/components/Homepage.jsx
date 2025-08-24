import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "450513ee";

function Homepage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setMovies([]);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Movie Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-l px-4 py-2 w-64 focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="border rounded overflow-hidden hover:shadow-lg">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
