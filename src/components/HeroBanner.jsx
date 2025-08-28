import React from 'react';

const HeroBanner = () => {
  return (
    <div 
      className="relative w-full h-80 flex items-center justify-center text-center overflow-hidden rounded-lg shadow-xl"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1542204165-65bf2659e951?q=80&w=1770&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="z-10 text-white p-4">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
          Discover Your Next Favorite Movie
        </h2>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
          Explore our vast database and find detailed information on all your favorite films.
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;