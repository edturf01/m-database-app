import { useState, useEffect } from 'react';
import './App.css';

 
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = 'https://www.omdbapi.com/';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const defaultMovies = ['Avengers', 'Batman', 'Spiderman', 'Superman'];

    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          defaultMovies.map((title) =>
            fetch(`${API_URL}?apikey=${API_KEY}&s=${title}`).then((res) =>
              res.json()
            )
          )
        );

        const validMovies = responses
          .filter((res) => res.Response === 'True')
          .flatMap((res) => res.Search);

        setMovies(validMovies);
      } catch (err) {
        setError('Failed to load initial movies');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  return (
    <div className="App">
      <h1>Movie Database</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => fetchMovies(searchQuery)}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/150'
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
