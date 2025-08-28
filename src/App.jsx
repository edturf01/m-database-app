import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Pagination from './components/Pagination';
import HeroBanner from './components/HeroBanner';
import Header from './components/Header';


const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = 'https://www.omdbapi.com/';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('movieFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
      return [];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  
  const searchMovies = async (query, page = 1) => {
    setLoading(true);
    setError('');
    setMovies([]);
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `${API_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(Number(data.totalResults));
      } else {
        setMovies([]);
        setError(data.Error);
        setTotalResults(0);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  
  const getMovieDetails = async (id) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movie details.');
    } finally {
      setLoading(false);
    }
  };

 
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.imdbID !== movieId)
    );
  };

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

 
  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery, currentPage);
    } else {
      const initialMovies = [
        'superman',
        'spiderman',
        'mission impossible',
        'wednesday',
        'my oxford year',
      ];

      const fetchInitialMovies = async () => {
        setLoading(true);
        setError('');

        try {
          const promises = initialMovies.map((title) =>
            fetch(`${API_URL}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`)
              .then((res) => res.json())
              .catch(() => null) 
          );

          const results = await Promise.all(promises);
          const combinedMovies = results.flatMap((data) =>
            data?.Response === 'True' ? data.Search : []
          );

          const sortedMovies = combinedMovies.sort(
            (a, b) => parseInt(b.Year) - parseInt(a.Year)
          );

          setMovies(sortedMovies);
          setTotalResults(sortedMovies.length);
        } catch (err) {
          setError('Failed to load initial movies.');
        } finally {
          setLoading(false);
        }
      };

      fetchInitialMovies();
    }
  }, [searchQuery, currentPage]);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleBackToHome = () => setSelectedMovie(null);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen p-4 transition-colors duration-300 bg-gray-900 dark:bg-gray-800">
        <Header
          onBackToHome={handleBackToHome}
          onToggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />

        {/* Hero Banner */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 z-0 opacity-20 rounded-lg"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1542204165-65bf2659e951?q=80&w=1770&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="relative z-10">
            <HeroBanner />
          </div>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />

        {/* Loading & Errors */}
        {loading && (
          <p className="text-center text-lg mt-4 text-white">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Movie List */}
        {!loading && !error && !selectedMovie && (
          <MovieList
            movies={movies}
            onMovieClick={getMovieDetails}
            favorites={favorites}
            onAddFavorite={addFavorite}
            onRemoveFavorite={removeFavorite}
          />
        )}

        {/* Movie Details */}
        {!loading && !error && selectedMovie && (
          <MovieDetails movie={selectedMovie} onBack={handleBackToHome} />
        )}

        {/* Pagination */}
        {!loading && !error && !selectedMovie && totalResults > 10 && (
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
