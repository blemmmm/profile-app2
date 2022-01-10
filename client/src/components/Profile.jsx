import React, { useState } from 'react';

function Profile (props) {
  const [random_number] = useState(Math.floor(Math.random() * 10) + 1);
  const { user } = props;




  const friends = new Array(random_number);
  for (let i = 0; i < friends.length; i++) {
    friends[i] = `https://source.unsplash.com/random/75x75?sig=${i}`;
  }

  const render_friends = friends.map((img, index) => {
    return <img
      key={index}
      className="profile-pic sm:w-8 sm:h-8 md:w-16 md:h-16"
      width="75"
      height="75"
      src={img}
      alt="person"
    />;

  });


  return (
    <div>
      <main className="profile-container sm:w-11/12 xl:w-full">
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
          <h1 className="section-header">{`Friends (${random_number})`}</h1>
          <div className="flex flex-row">
            {render_friends}
          </div>
        </section>
        <section>
          <h1 className="section-header">Gallery</h1>
          <div className="image-group sm:flex-col md:flex-col lg:flex-row">
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=1" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=2" />
            <img className="mx-1 my-1" width="330" height="330" src="https://source.unsplash.com/random/330x330?sig=3" />
          </div>
          <div className="image-group sm:flex-col md:flex-col lg:flex-row">
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