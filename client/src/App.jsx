import React, { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import useHistory from './useHistory';
import { HeadProvider, Title } from 'react-head';

function App () {
  const history = useHistory();
  const [user, setUser] = useState(null);

  switch (history.pathname) {
    case '/profile-app':
      return (
        <div>
          <HeadProvider>
            <Title>Sign In</Title>
          </HeadProvider>
          <Login history={history} set_user={setUser}/>
        </div>
      );
    case '/profile-app/Profile':
      return (
        <div>
          <HeadProvider>
            <Title>{user.name}</Title>
          </HeadProvider>
          <Profile history={history} user={user}/>
        </div>
      );
    case '/profile-app/Signup':
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