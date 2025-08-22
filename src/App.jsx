import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "450513ee";

 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovie = async (newPage = 1) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${newPage}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
        setTotalResults(parseInt(data.totalResults));
        setPage(newPage);
      } else {
        setMovies([]);
        setError(data.Error);
        setTotalResults(0);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setMovies([]);
      setTotalResults(0);
    }
  };

  const addFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== id));
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Database</h1>
      <input
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={() => searchMovie(1)}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-2">
            <h2 className="text-xl font-semibold">{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            {movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={movie.Title} className="mt-2 w-48" />
            )}
            <button
              onClick={() =>
                favorites.find((fav) => fav.imdbID === movie.imdbID)
                  ? removeFavorite(movie.imdbID)
                  : addFavorite(movie)
              }
              className="mt-2 bg-green-500 text-white px-3 py-1"
            >
              {favorites.find((fav) => fav.imdbID === movie.imdbID)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => searchMovie(page - 1)}
            className="bg-gray-300 px-3 py-1 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => searchMovie(page + 1)}
            className="bg-gray-300 px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((movie) => (
              <div key={movie.imdbID} className="border p-2">
                <h2 className="text-xl font-semibold">{movie.Title}</h2>
                <p>Year: {movie.Year}</p>
                {movie.Poster !== "N/A" && (
                  <img src={movie.Poster} alt={movie.Title} className="mt-2 w-48" />
                )}
                <button
                  onClick={() => removeFavorite(movie.imdbID)}
                  className="mt-2 bg-red-500 text-white px-3 py-1"
                >
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
