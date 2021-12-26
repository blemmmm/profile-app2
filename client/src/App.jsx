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
    console.log(history.pathname, history.previous_pathname);
    console.log('user:', user);
  });

  async function fetchSession () {
    const response = await fetch('http://localhost:3001/session', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    return data;
  }

  useEffect(() => {
    if (!user) {
      fetchSession().then((data) => set_user(data));
    }
  }, [user]);




  useEffect(() => {
    switch (history.pathname) {
      case '/': {
        if (user instanceof Object) {
          document.title = user.name;
        } else {
          document.title = 'Profile App';
        }
      } break;
      case '/signin': {
        if (user instanceof Object) {
          document.title = user.name;
        } else {
          document.title = 'Sign In';
        }
      } break;
      case '/profile': {
        if (user instanceof Object) {
          document.title = user.name;
        }
      } break;
      case '/signup': {
        if (user instanceof Object) {
          document.title = user.name;
        } else {
          document.title = 'Sign Up';
        }
      } break;
      case '/edit': {
        if (user instanceof Object) {
          document.title = 'Edit Profile';
        }
      } break;
      default: {
        document.title = 'Profile App';
      }
    }
  }, [user, history]);

  switch (history.pathname) {
    case '/': {
      if (user instanceof Object) {
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      }
      return (
        <div>
          <Homepage history={history}/>
        </div>
      );
    }
    case '/signin': {
      if (user instanceof Object) {
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      }
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
      } return (
        <div>
          <Homepage history={history}/>
        </div>
      );
    }
    case '/signup': {
      if (user instanceof Object) {
        return (
          <div>
            <Profile history={history} user={user} set_user={set_user}/>
          </div>
        );
      }
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
      } return (
        <div>
          <Homepage history={history}/>
        </div>
      );
    }
    default: {
      <div>
        <Homepage history={history}/>
      </div>;
    }
  }

}

export default App;