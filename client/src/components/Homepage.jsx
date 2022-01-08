import React from 'react';


function Homepage () {

  const unsplash_url = 'https://source.unsplash.com/collection/8207796/catto-doggo';

  return (
    <div>
      <main>
        <div className="bg-image" style={{ backgroundImage: `url(${unsplash_url})` }}></div>
      </main>
    </div>
  );
}

export default Homepage;