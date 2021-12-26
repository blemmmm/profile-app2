import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function Navigation (props) {
  const { user } = props;
  const [menu, set_menu] = useState(false);
  const { set_user } = props;
  const path = props.history.pathname;

  const handleSignIn = () => props.history.push('/signin');
  const handleSignUp = () => props.history.push('/signup');

  const handleBackorEdit = (e) => {
    e.preventDefault();
    if (path === '/edit') {
      props.history.push('/profile');
    } else {
      props.history.push('/edit');
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/logout', {
      method: 'GET',
      credentials: 'include',
    });

    set_user(null);
    props.history.push('/');
  };

  const renderNav = () => {

    if (user instanceof Object) {
      const name = user.name.split(' ');
      const first_name = name[0].toString();

      return (
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
                  {(() => {
                    if (path === '/admin') {
                      return (
                        <button className="out-btn" onClick={handleSignOut}>Sign Out</button>

                      );
                    } else {
                      return (
                        <div>
                          <button className="out-btn" onClick={handleBackorEdit}>{path === '/edit' ? 'Back to Profile' : 'Edit Profile'}</button>
                          <button className="out-btn" onClick={handleSignOut}>Sign Out</button>
                        </div>
                      );
                    }
                  })()}

                </div>
              </div>
            </div>
          )}
        </nav>
      );
    } return (
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
    );

  };
  return (
    <div>
      {renderNav()}
    </div>
  );

}

export default Navigation;

