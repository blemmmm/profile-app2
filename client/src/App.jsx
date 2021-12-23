import React, { useEffect, useState } from 'react';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Signup from './components/Signup';
import useHistory from './useHistory';

function App () {
  const history = useHistory();
  const [user, set_user] = useState(null);

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

  useEffect(() => {
    console.log(history.pathname, history.previous_pathname);
  });


  useEffect(() => {
    switch (history.pathname) {
      case '/': {
        if (user instanceof Object) {
          history.replace('/profile');
          document.title = user.name;
        } else {
          document.title = 'Profile App';
        }
      } break;
      case '/signin': {
        if (user instanceof Object) {
          history.replace('/profile');
          document.title = user.name;
        } else {
          document.title = 'Sign In';
        }
      } break;
      case '/profile': {
        if (user instanceof Object) {
          document.title = user.name;
        } else if (history.pathname === '/profile' && history.previous_pathname === null) {
          history.replace('/profile');
        } else {
          history.replace('/');
        }
      } break;
      case '/signup': {
        if (user instanceof Object) {
          history.replace('/profile');
          document.title = user.name;
        } else {
          document.title = 'Sign Up';
        }
      } break;
      case '/edit': {
        if (user instanceof Object) {
          document.title = 'Edit Profile';
        } else if (history.pathname === '/edit' && history.previous_pathname === null) {
          history.replace('/edit');
        }
        else {
          history.replace('/');
        }
      } break;
      default: {
        document.title = 'Profile App';
      }
    }
  }, [user, history]);

  switch (history.pathname) {
    case '/': {
      return (
        <div>
          <Homepage history={history}/>
        </div>
      );
    }
    case '/signin': {
      return (
        <div>
          <Login history={history} set_user={set_user}/>
        </div>
      );
    }
    case '/profile': {
      if (user instanceof Object) {
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      } return null;
    }
    case '/signup': {
      return (
        <div>
          <Signup history={history}/>
        </div>
      );
    }
    case '/edit': {
      if (user instanceof Object) {
        return (
          <div>
            <ProfileEdit history={history} user={user} set_user={set_user}/>
          </div>
        );
      } return null;
    }
    default: {
      <div>
        <Homepage history={history}/>
      </div>;
    }
  }

}

export default App;