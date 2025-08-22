import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

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
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Database</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={searchMovie} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <MovieCard movie={movie} />
    </div>
  );
}

export default App;
