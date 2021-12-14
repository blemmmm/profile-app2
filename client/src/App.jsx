import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import useHistory from './useHistory';
import { HeadProvider, Title } from 'react-head';

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

  console.log(history.pathname);
  console.log(user);

  switch (history.pathname) {
    case '/':
      return (
        <div>
          <HeadProvider>
            <Title>Sign In</Title>
          </HeadProvider>
          <Login history={history} set_user={set_user}/>
        </div>
      );
    case '/profile':
      return (
        <div>
          <HeadProvider>
            <Title>Profile</Title>
          </HeadProvider>
          <Profile history={history} user={user} set_user={set_user}/>
        </div>
      );
    case '/signup':
      return (
        <div>
          <HeadProvider>
            <Title>Sign Up</Title>
          </HeadProvider>
          <Signup history={history}/>
        </div>
      );
  }


  return (
    <div>
      <Login history={history}/>
    </div>
  );
}

export default App;