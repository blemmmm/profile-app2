import React from 'react';


function Profile (props) {

  const { user } = props;
  const name = user.name.split(' ');
  const first_name = name[0].toString();

  const handleCLick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await response.json();
    console.log('logout', data);
    props.history.push('/profile-app');
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="px-1 font-semibold text-white">
              {`Hello, ${first_name}!`}
            </div>
            <div className="ml-3 relative">
              <div>
                <div className="flex-shrink-0 flex items-center font-semibold text-white focus:outline-none">
                  <button className="py-2 px-4 font-semibold text-white bg-gray-800 hover:bg-gray-600">
                    <a href="/profile-app" onClick={handleCLick}>
                      Sign out
                    </a>
                  </button>
                </div>
              </div>
            </div>
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