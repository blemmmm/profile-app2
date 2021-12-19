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

  console.log(user instanceof Object);
  if (history.pathname === '/') {
    if (user instanceof Object) {
      history.replace('/profile');
    }
    document.title = 'Profile App';
    return (
      <div>
        <Homepage history={history}/>
      </div>
    );
  } else if (history.pathname === '/signin'){
    if (user instanceof Object) {
      history.replace('/profile');
    }
    document.title = 'Sign In';
    return (
      <div>
        <Login history={history} set_user={set_user}/>
      </div>
    );
  } else if (history.pathname === '/profile') {
    if (user instanceof Object) {
      document.title = user.name;
      return (
        <div>
          <Profile history={history} user={user} set_user={set_user}/>
        </div>
      );
    }
    return null;

  } else if (history.pathname === '/signup') {
    if (user instanceof Object) {
      history.replace('/profile');
    }
    document.title = 'Sign Up';
    return (
      <div>
        <Signup history={history}/>
      </div>
    );
  } else if (history.pathname === '/edit') {
    if (user instanceof Object) {
      document.title = 'Edit Profile';
      return (
        <div>
          <ProfileEdit history={history} user={user} set_user={set_user}/>
        </div>
      );
    } return null;

  }
  document.title = 'Profile App';
  return (
    <div>
      <Homepage history={history}/>
    </div>
  );


  // switch (history.pathname) {
  //   case '/':
  //     if (user instanceof Object) {
  //       history.replace('/profile');
  //     } else {
  //       document.title = 'Profile App';
  //       return (
  //         <div>
  //           <Homepage history={history}/>
  //         </div>
  //       );
  //     }
  //     break;
  //   case '/signin':
  //     if (user instanceof Object) {
  //       history.replace('/profile');
  //     } else {
  //       document.title = 'Sign In';
  //       return (
  //         <div>
  //           <Login history={history} set_user={set_user}/>
  //         </div>
  //       );
  //     }
  //     break;
  //   case '/profile':
  //     if (user instanceof Object) {
  //       document.title = user.name;
  //       return (
  //         <div>
  //           <Profile history={history} user={user} set_user={set_user}/>
  //         </div>
  //       );
  //     } return (
  //       history.replace('/')
  //     );

  //   case '/signup':
  //     if (user instanceof Object) {
  //       history.replace('/profile');
  //     } else {
  //       document.title = 'Sign Up';
  //       return (
  //         <div>
  //           <Signup history={history}/>
  //         </div>
  //       );
  //     }
  //     break;
  //   case '/edit':
  //     if (user instanceof Object) {
  //       document.title = 'Edit Profile';
  //       return (
  //         <div>
  //           <ProfileEdit history={history} user={user} set_user={set_user}/>
  //         </div>
  //       );
  //     } else {
  //       history.replace('/');
  //     }
  //     break;
  //   default:
  //     <div>
  //       <Homepage history={history}/>
  //     </div>;
  // }


  // return (
  //   <div>

  //   </div>
  // );

}

export default App;