import React from 'react';
import { Icon } from '@iconify/react';

function Homepage (props) {

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
            <button className="out-btn pr-3" onClick={handleSignIn}>Sign in</button>
            <button className="up-btn" onClick={handleSignUp}>Create an Account</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Homepage;