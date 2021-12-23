import React from 'react';
import { Icon } from '@iconify/react';

function Homepage (props) {

  const unsplashUrl = 'https://source.unsplash.com/collection/8207796/catto-doggo';
  const handleSignIn = () => props.history.push('/signin');
  const handleSignUp = () => props.history.push('/signup');

  return (
    <div>
      <nav>
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center px-1 font-semibold text-white">
            <Icon icon="gg:profile" />
            <span className="pl-1">Profile App</span>
          </div>
          <div className="ml-3 relative">
            <button className="in-btn" onClick={handleSignIn}>Sign in</button>
            <button className="up-btn" onClick={handleSignUp}>Create an Account</button>
          </div>
        </div>
      </nav>
      <main>
        <div className="bg-image" style={{ backgroundImage: `url(${unsplashUrl})` }}></div>
      </main>
    </div>
  );
}

export default Homepage;