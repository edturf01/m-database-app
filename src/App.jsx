import React, { useState, useEffect } from "react";

function App() {
  const API_KEY = "450513ee";

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const translations = {
    en: {
      searchPlaceholder: "Search for a movie",
      favorites: "My Favorites",
      viewDetails: "View Details",
      addFavorite: "Add to Favorites",
      removeFavorite: "Remove Favorite",
      trailer: "Trailer",
      toggleTheme: "Toggle",
    },
    fr: {
      searchPlaceholder: "Rechercher un film",
      favorites: "Mes Favoris",
      viewDetails: "Voir les détails",
      addFavorite: "Ajouter aux favoris",
      removeFavorite: "Supprimer des favoris",
      trailer: "Bande-annonce",
      toggleTheme: "Basculer",
    },
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const searchMovies = async (p = 1) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&page=${p}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setError("");
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setMovies([]);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
      }
    } catch (err) {
      setError("Failed to fetch movie details");
    }
  };

  const toggleFavorite = (m) => {
    if (favorites.find((f) => f.imdbID === m.imdbID)) {
      setFavorites(favorites.filter((f) => f.imdbID !== m.imdbID));
    } else {
      setFavorites([...favorites, m]);
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const sortedMovies = [...movies].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "yearAsc") return a.Year.localeCompare(b.Year);
    if (sortBy === "yearDesc") return b.Year.localeCompare(a.Year);
    return 0;
  });

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-4`}>
      <div className="flex justify-between mb-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-1"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
        <button onClick={toggleTheme} className="border px-4 py-2">
          {translations[lang].toggleTheme} {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Movie Database</h1>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder={translations[lang].searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2 flex-1"
        />
        <button
          onClick={() => searchMovies(1)}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {translations[lang].viewDetails}
        </button>
      </div>

      <div className="flex items-center mb-4">
        <label className="mr-2">Sort by Year:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-1"
        >
          <option value="">None</option>
          <option value="yearAsc">Ascending</option>
          <option value="yearDesc">Descending</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMovies.map((m) => (
          <div key={m.imdbID} className="border p-2">
            <h2 className="font-semibold">{m.Title}</h2>
            <p>Year: {m.Year}</p>
            {m.Poster !== "N/A" && <img src={m.Poster} alt={m.Title} className="w-48 mt-2" />}
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => getMovieDetails(m.imdbID)}
                className="border px-2 py-1"
              >
                {translations[lang].viewDetails}
              </button>
              <button
                onClick={() => toggleFavorite(m)}
                className="border px-2 py-1"
              >
                {favorites.find((f) => f.imdbID === m.imdbID)
                  ? translations[lang].removeFavorite
                  : translations[lang].addFavorite}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                searchMovies(i + 1);
              }}
              className={`px-3 py-1 border ${page === i + 1 ? "bg-blue-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Movie Details + Trailer */}
      {movie && (
        <div className="mt-6 border p-4">
          <h2 className="text-xl font-bold">{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Cast: {movie.Actors}</p>
          <p>Plot: {movie.Plot}</p>
          {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} className="w-48 mt-2" />}
          {movie.Title && (
            <div className="mt-2">
              <h3 className="font-semibold">{translations[lang].trailer}</h3>
              <iframe
                title="trailer"
                width="320"
                height="180"
                src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movie.Title + " trailer")}`}
                allowFullScreen
                className="mt-2"
              />
            </div>
          )}
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">{translations[lang].favorites}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {favorites.map((f) => (
              <div key={f.imdbID} className="border p-2">
                <h3 className="font-semibold">{f.Title}</h3>
                <p>Year: {f.Year}</p>
                {f.Poster !== "N/A" && <img src={f.Poster} alt={f.Title} className="w-48 mt-2" />}
                <button
                  onClick={() => toggleFavorite(f)}
                  className="border px-2 py-1 mt-2"
                >
                  {translations[lang].removeFavorite}
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
