import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function Navigation (props) {
  const { user } = props;
  const { set_user } = props;
  const [menu, set_menu] = useState(false);
  const path = props.history.pathname;

  const handle_sign_in = () => props.history.push('/signin');
  const handle_sign_up = () => props.history.push('/signup');

  const handle_back_edit = (e) => {
    e.preventDefault();
    if (path === '/edit') {
      props.history.push('/profile');
    } else {
      props.history.push('/edit');
    }
  };

  const handle_sign_out = async (e) => {
    e.preventDefault();
    await fetch('/logout', {
      method: 'GET',
      credentials: 'include',
    });

    set_user(null);
    props.history.push('/');
  };

  const render_navigation = () => {

    if (user instanceof Object) {
      const name = user.name.split(' ');
      const first_name = name[0].toString();

      return (
        <nav className="sm:text-sm md:text-base">
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
                        <button className="out-btn" onClick={handle_sign_out}>Sign Out</button>

                      );
                    } else {
                      return (
                        <div>
                          <button className="out-btn" onClick={handle_back_edit}>{path === '/edit' ? 'Back to Profile' : 'Edit Profile'}</button>
                          <button className="out-btn" onClick={handle_sign_out}>Sign Out</button>
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
      <nav className="sm:text-sm md:text-base">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center px-1 font-semibold text-white">
            <Icon icon="gg:profile" />
            <span className="pl-1">Profile App</span>
          </div>
          <div className="ml-3 relative flex flex-row">
            <button className="in-btn sm:px-2 md:px-4" onClick={handle_sign_in}>Sign in</button>
            <button className="up-btn sm:px-2 md:px-4" onClick={handle_sign_up}>Create an Account</button>
          </div>
        </div>
      </nav>
    );

  };
  return (
    <div>
      {render_navigation()}
    </div>
  );

}

export default Navigation;

