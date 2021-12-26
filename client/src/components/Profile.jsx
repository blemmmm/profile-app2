import React, { useState } from 'react';

function Profile (props) {
  const [randomNum] = useState(Math.floor(Math.random() * 10) + 1);
  const { user } = props;




  const friends = new Array(randomNum);
  for (let i = 0; i < friends.length; i++) {
    friends[i] = `https://source.unsplash.com/random/75x75?sig=${i}`;
  }

  const renderFriends = friends.map((img, index) => {
    return <img
      key={index}
      className="relative z-30 inline object-cover w-16 h-16 border-2 border-white rounded-full"
      width="75"
      height="75"
      src={img}
      alt="person"
    />;

  });


  return (
    <div>
      <main className="profile-container">
        <div className="flex-justify-center flex-col items-center my-4">
          <img className="rounded-full my-4" width="300" height="300" src="https://source.unsplash.com/random/300x300?puppy" alt="profile picture" />
          <h4 className="text-gray-500">@{user.username}</h4>
          <h1 className="font-black text-5xl mb-4">{user.name}</h1>
          <h1 className="">{user.bio}</h1>
        </div>
        <section>
          <h1 className="section-header">About me</h1>
          <p className="items-center">{user.about_me ? user.about_me : 'No information provided.'}</p>
        </section>
        <section>
          <h1 className="section-header">Favorites</h1>
          <p className="items-center">{user.favorites ? user.favorites : 'No information provided.'}</p>
        </section>
        <section>
          <h1 className="section-header">{`Friends (${randomNum})`}</h1>
          <div className="flex flex-row">
            {renderFriends}
          </div>
        </section>
        <section>
          <h1 className="section-header">Gallery</h1>
          <div className="image-group">
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=1" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=2" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=3" />
          </div>
          <div className="image-group">
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=4" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?ig=5" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=6" />
          </div>
        </section>

      </main>
    </div>
  );
}

export default Profile;