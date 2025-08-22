import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const API_KEY = "450513ee";

  const searchMovie = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        // Fetch full details for each movie
        const detailedMovies = await Promise.all(
          data.Search.map(async (m) => {
            const res = await fetch(
              `https://www.omdbapi.com/?i=${m.imdbID}&apikey=${API_KEY}`
            );
            return await res.json();
          })
        );
        setMovies(detailedMovies);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setMovies([]);
      setError("Failed to fetch data");
    }
  };

  // Apply filtering
  let filteredMovies = movies;
  if (filterGenre) {
    filteredMovies = filteredMovies.filter((m) =>
      m.Genre.toLowerCase().includes(filterGenre.toLowerCase())
    );
  }
  if (filterYear) {
    filteredMovies = filteredMovies.filter((m) => m.Year === filterYear);
  }

  // Apply sorting
  if (sortBy) {
    filteredMovies.sort((a, b) => {
      if (sortBy === "Year") return b.Year - a.Year;
      if (sortBy === "imdbRating")
        return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
      return 0;
    });
  }

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Database</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={searchMovie}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {/* Sorting & Filtering */}
      <div className="flex gap-2 mb-4">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border p-2"
        >
          <option value="">Sort By</option>
          <option value="Year">Year</option>
          <option value="imdbRating">IMDB Rating</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Genre"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Filter by Year"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border p-2"
        />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {filteredMovies.map((movie) => (
        <div key={movie.imdbID} className="mt-4 border-b pb-4">
          <h2 className="text-xl font-semibold">{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Cast: {movie.Actors}</p>
          <p>IMDB Rating: {movie.imdbRating}</p>
          <p>Plot: {movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} className="mt-2 w-48" />
        </div>
      ))}
    </div>
  );
}

export default App;
