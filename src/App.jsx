import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "450513ee";

  // Load favorites from local storage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Update local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const addFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== id));
  };

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
      <button onClick={searchMovie} className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {movie && (
        <div className="mt-4 border p-4 rounded">
          <h2 className="text-xl font-semibold">{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Cast: {movie.Actors}</p>
          <p>Plot: {movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} className="mt-2 w-48" />
          <div className="mt-2">
            <button
              onClick={() => addFavorite(movie)}
              className="bg-green-500 text-white px-3 py-1 mr-2"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Favorites</h2>
          <ul>
            {favorites.map((fav) => (
              <li key={fav.imdbID} className="mb-2 flex items-center">
                <img src={fav.Poster} alt={fav.Title} className="w-16 mr-2" />
                <span>{fav.Title}</span>
                <button
                  onClick={() => removeFavorite(fav.imdbID)}
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
