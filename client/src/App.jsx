import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import useHistory from './useHistory';
import { HeadProvider, Title } from 'react-head';

function App () {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchSession () {
      const response = await fetch('http://localhost:3001/session');
      const json = await response.json();
      setUser(json);
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
          <Login history={history} set_user={setUser}/>
        </div>
      );
    case '/Profile':
      return (
        <div>
          <HeadProvider>
            <Title>{user.name}</Title>
          </HeadProvider>
          <Profile history={history} user={user} set_user={setUser}/>
        </div>
      );
    case '/Signup':
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