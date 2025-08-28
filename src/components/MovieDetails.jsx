import React from 'react';

const MovieDetails = ({ movie, onBack }) => {
  if (!movie) {
    return null;
  }

  const renderRatings = () => {
    if (movie.Ratings && movie.Ratings.length > 0) {
      return (
        <div className="mt-4">
          <h4 className="text-xl font-semibold mb-2">Ratings:</h4>
          <div className="flex flex-wrap gap-4">
            {movie.Ratings.map((rating, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">{rating.Source}</p>
                <p className="font-bold">{rating.Value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 mt-8 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-4 text-blue-400 hover:underline transition-all duration-200"
      >
        &larr; Back to Homepage
      </button>
      
      <div className="md:flex gap-8">
        <div className="flex-shrink-0">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
            alt={movie.Title}
            className="rounded-lg shadow-md w-full md:w-auto"
          />
        </div>
        
        <div className="mt-6 md:mt-0 flex-grow">
          <h2 className="text-3xl font-bold mb-2">{movie.Title} <span className="text-gray-400 font-normal">({movie.Year})</span></h2>
          <p className="text-lg text-blue-400 mb-2">{movie.Genre}</p>
          <p className="text-gray-300 italic mb-4">{movie.Plot}</p>
          
          <div className="space-y-2 text-gray-300">
            <p><strong>Directed by:</strong> {movie.Director}</p>
            <p><strong>Written by:</strong> {movie.Writer}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating} / 10</p>
          </div>
          
          {renderRatings()}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;