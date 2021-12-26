import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

function ProfileEdit (props) {
  const [menu, set_menu] = useState(false);
  const { user } = props;
  const { set_user } = props;
  const [username, set_username] = useState(user.username);
  const [profile_name, set_profile_name] = useState(user.name);
  const [bio, set_bio] = useState(user.bio);
  const [about_me, set_about_me] = useState(user.about_me);
  const [favorites, set_favorites] = useState(user.favorites);

  const name = user.name.split(' ');
  const first_name = name[0].toString();

  const handleBack = (e) => {
    e.preventDefault();
    props.history.push('/profile');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'username': username,
          'name': profile_name,
          'bio': bio,
          'about_me': about_me,
          'favorites': favorites,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        set_user(data.user);
        Swal.fire({
          text: data.message,
          icon: 'success',
        });
        props.history.push('/profile');
      } else {
        Swal.fire({
          title: 'ERROR',
          text: data.message,
          icon: 'error',
        });
      }

    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: 'ERROR',
        text: 'Edit failed',
        icon: 'error',
      });
    }
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
                <button className="out-btn" onClick={handleBack}>Back to Profile</button>
                <button className="out-btn" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <main className="profile-container">
        <div className="flex-justify-center flex-col items-center my-4">
          <div className="relative">
            <img className="rounded-full my-4" width="300" height="300" src="https://source.unsplash.com/random/300x300?puppy" alt="profile picture" />
            <button className="absolute inset-3/4 inline-flex items-center justify-center w-12 h-12 mr-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-justify-center flex-col items-center my-4">
            <div className="flex flex-col justify-between">
              <div className="flex flex-row items-center justify-between">
                <label className="font-bold pr-4" htmlFor="email" > Username </label>
                <div className="relative text-gray-700">
                  <input
                    className="input-text-with-icon"
                    type="text"
                    value={username}
                    onChange={(e) => set_username(e.target.value)}
                    id="username"
                  />
                  <div className="input-icon">
                    <Icon icon="ph:at-bold" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="font-bold pr-4" htmlFor="email" > Name </label>
                <div className="relative text-gray-700">
                  <input
                    className="input-text-with-icon"
                    type="text"
                    value={profile_name}
                    onChange={(e) => set_profile_name(e.target.value)}
                    id="username"
                  />
                  <div className="input-icon">
                    <Icon icon="vs:profile" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="font-bold pr-4" htmlFor="email" > Bio </label>
                <div className="relative text-gray-700">
                  <input
                    className="input-text-with-icon"
                    type="text"
                    value={bio}
                    onChange={(e) => set_bio(e.target.value)}
                    id="username"
                  />
                  <div className="input-icon">
                    <Icon icon="jam:write-f" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section>
            <h1 className="section-header">About me</h1>
            <textarea
              className="textarea"
              value={about_me}
              onChange={(e) => set_about_me(e.target.value)}
            ></textarea>
          </section>
          <section>
            <h1 className="section-header">Favorites</h1>
            <textarea
              className="textarea"
              value={favorites}
              onChange={(e) => set_favorites(e.target.value)}
            ></textarea>
          </section>
          <div className="flex flex-row justify-end my-6">
            <button className="cancel-btn" onClick={handleBack}>Cancel</button>
            <button className="save-btn">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ProfileEdit;