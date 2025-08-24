import React from 'react';

const MovieCard = ({ movie, onMovieClick, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
          className="w-full h-80 object-cover cursor-pointer"
          onClick={() => onMovieClick(movie.imdbID)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents movie details from opening
            if (isFavorite) {
              onRemoveFavorite(movie.imdbID);
            } else {
              onAddFavorite(movie);
            }
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-white text-xl transition-all duration-200 hover:scale-110"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold truncate">{movie.Title}</h3>
        <p className="text-gray-400 mt-1">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;