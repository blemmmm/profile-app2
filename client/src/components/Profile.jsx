import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function Profile (props) {
  const [menu, set_menu] = useState(false);
  const [randomNum] = useState(Math.floor(Math.random() * 10) + 1);
  const { user } = props;
  const { set_user } = props;

  const name = user.name.split(' ');
  const first_name = name[0].toString();

  const friends = new Array(randomNum);
  for (let i = 0; i < friends.length; i++) {
    friends[i] = `https://source.unsplash.com/random/75x75?sig=${i}`;
  }

  const renderFriends = friends.map((img, index) => {
    return <img
      key={index}
      className="mx-1 my-1"
      width="75"
      height="75"
      src={img}
      alt="person"
    />;

  });

  const handleEdit = () => {
    props.history.push('/edit');
  };


  const handleSignOut = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/logout', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();
    console.log('logout', data);
    set_user(null);
    props.history.push('/');
  };


  return (
    <div>
      <nav>
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center px-1 font-semibold text-white">
            <Icon icon="gg:profile" />
            <span className="pl-1">{`Hello, ${first_name}!`}</span>
          </div>
          <div className="ml-3 relative">
            <button className="text-white" onClick={() => set_menu(!menu)}><Icon icon="ls:dropdown" /></button>
          </div>
        </div>
        {menu === true && (
          <div
            className="transition ease-in duration-1000"
            onClick={() => set_menu(false)}
          >
            <div className="absolute top-12 right-7 bg-gray-800 w-40 rounded-sm">
              <div className="flex flex-col items-center justify-center">
                <button className="out-btn" onClick={handleEdit}>Edit Profile</button>
                <button className="out-btn" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="profile-container">
        <div className="flex-justify-center flex-col items-center my-4">
          <img className="rounded-full my-4" width="300" height="300" src="https://source.unsplash.com/random/300x300?puppy" alt="profile picture" />
          <h4 className="text-gray-500">@{user.username}</h4>
          <h1 className="font-black text-5xl mb-4">{user.name}</h1>
          <h1 className="">✨just a bio✨</h1>
        </div>
        <section>
          <h1 className="section-header">About me</h1>
          <p className="items-center">No information provided.</p>
        </section>
        <section>
          <h1 className="section-header">Favorites</h1>
          <p className="items-center">No information provided.</p>
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