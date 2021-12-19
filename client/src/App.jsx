import React, { useEffect, useState } from 'react';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import useHistory from './useHistory';

function App () {
  const history = useHistory();
  const [user, set_user] = useState(null);

  console.log(history.pathname, history.previous_pathname);
  useEffect(() => {
    async function fetchSession () {
      const response = await fetch('http://localhost:3001/session', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      set_user(data);
    }
    fetchSession();
  }, []);

  switch (history.pathname) {
    case '/':
      if (user instanceof Object) {
        history.replace('/profile');
        document.title = user.name;
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      } else {
        document.title = 'Profile App';
        return (
          <div>
            <Homepage history={history}/>
          </div>
        );
      }


    case '/signin':
      if (user instanceof Object) {
        history.replace('/profile');
        document.title = user.name;
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      } else {
        document.title = 'Sign In';
        return (
          <div>
            <Login history={history} set_user={set_user}/>
          </div>
        );
      }

    case '/profile':
      if (user instanceof Object) {
        document.title = user.name;
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      } else {
        document.title = 'Sign In';
        history.replace('/signin');
        return (
          <div>
            <Login history={history} set_user={set_user}/>
          </div>
        );
      }

    case '/signup':
      if (user instanceof Object) {
        history.replace('/profile');
        document.title = user.name;
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      } else {
        document.title = 'Sign Up';
        return (
          <div>
            <Signup history={history}/>
          </div>
        );
      }

  }


  return (
    <div>
      <Login history={history}/>
    </div>
  );
}

export default App;