import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

function ProfileEdit (props) {
  const { user } = props;
  const { set_user } = props;
  const [username, set_username] = useState(user.username);
  const [profile_name, set_profile_name] = useState(user.name);
  const [bio, set_bio] = useState(user.bio);
  const [about_me, set_about_me] = useState(user.about_me);
  const [favorites, set_favorites] = useState(user.favorites);

  const handle_back = (e) => {
    e.preventDefault();
    props.history.push('/profile');
  };


  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
      Swal.fire({
        title: 'ERROR',
        text: 'Edit failed',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <main className="profile-container sm:w-11/12 xl:w-full">
        <div className="flex-justify-center flex-col items-center my-4">
          <img className="rounded-full my-4" width="300" height="300" src="https://source.unsplash.com/random/300x300?puppy" alt="profile picture" />
        </div>
        <form onSubmit={handle_submit}>
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
                    disabled
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
            <button className="cancel-btn" onClick={handle_back}>Cancel</button>
            <button className="save-btn">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ProfileEdit;