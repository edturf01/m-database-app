import React from "react";

function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="mt-4 p-4 border rounded shadow-md max-w-md">
      <h2 className="text-xl font-semibold">{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Cast: {movie.Actors}</p>
      <p>Plot: {movie.Plot}</p>
      {movie.Poster && movie.Poster !== "N/A" && (
        <img src={movie.Poster} alt={movie.Title} className="mt-2 w-48" />
      )}
    </div>
  );
}

export default MovieCard;
