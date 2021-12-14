import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

function Profile (props) {
  const { user } = props;
  const { set_user } = props;



  const name = user.name.split(' ');
  const first_name = name[0].toString();

  const handleCLick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/logout', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();
    console.log('logout', data);
    props.history.push('/');
  };

  return (
    <div>
      <nav>
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center px-1 font-semibold text-white">
            <Icon icon="gg:profile" />
            <span>{`Hello, ${first_name}!`}</span>
          </div>
          <div className="ml-3 relative">
            <button className="out-btn">
              <a href="/" onClick={handleCLick}>
                      Sign out
              </a>
            </button>
          </div>
        </div>
      </nav>
      <main>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.username}</h1>
        <h1>{user.created_at}</h1>
      </main>
    </div>
  );
}

export default Profile;