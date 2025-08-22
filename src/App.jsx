import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "450513ee";

  const searchMovie = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
        setError("");
      } else {
        setMovie(null);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setMovie(null);
    }
  };

  return (
    <div className="App p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Movie Database</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 mr-2 rounded"
        />
        <button
          onClick={searchMovie}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {movie && (
        <div className="mt-4 border p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p className="mt-2">{movie.Plot}</p>
          {movie.Poster && (
            <img src={movie.Poster} alt={movie.Title} className="mt-4 w-48 mx-auto" />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
