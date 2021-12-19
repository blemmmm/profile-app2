import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function ProfileEdit (props) {
  const [menu, set_menu] = useState(false);
  const { user } = props;
  const { set_user } = props;

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
        <h1>Edit Profile Contents</h1>
      </main>
    </div>
  );
}

export default ProfileEdit;