import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, favorites, onAddFavorite, onRemoveFavorite }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-400 mt-8">No movies found. Try a different search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {movies.map((movie) => {
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onMovieClick={onMovieClick}
            isFavorite={isFavorite}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        );
      })}
    </div>
  );
};

export default MovieList;