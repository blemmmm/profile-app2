import React from 'react';


function Homepage () {

  const unsplashUrl = 'https://source.unsplash.com/collection/8207796/catto-doggo';

  return (
    <div>
      <main>
        <div className="bg-image" style={{ backgroundImage: `url(${unsplashUrl})` }}></div>
      </main>
    </div>
  );
}

export default Homepage;