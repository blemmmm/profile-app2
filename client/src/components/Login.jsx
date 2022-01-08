import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import assert from 'assert';

function Login (props) {
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const { set_user } = props;



  const handleSubmit = async (e) => {
    // pass the user's details here
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          'username': username,
          'password': password,
        }),
      });

      const data = await response.json();
      // assert(data instanceof Object);


      if (response.status >= 400) {
        Swal.fire({
          title: 'ERROR',
          text: data.message,
          icon: 'error',
        });

      } else {
        const user = data.user;
        set_user(user);
        if (user.user_role === 'Admin') {
          props.history.push('/admin');
        } else {
          props.history.push('/profile');
        }

      }


    } catch (err) {
      Swal.fire({
        text: 'Network error.',
        icon: 'error',
      });
    }

  };

  const handleCLick = (e) => {
    e.preventDefault();
    props.history.push('/signup');
  };
  return (
    <div>
      <div className="title-container">
        <h1 className="text-5xl">Sign In</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-4">
            <label
              className="input-label"
              htmlFor="email"
            >
            Username
            </label>
            <input
              value={username}
              onChange={(e) => set_username(e.target.value)}
              className="input-text"
              id="username"
              type="text"
            />
          </div>
          <div className="mb-4 pt-5">
            <label
              className="input-label"
              htmlFor="password"
            >
            Password
            </label>
            <input
              value={password}
              onChange={(e) => set_password(e.target.value)}
              className="input-text"
              id="pw"
              type="password"
              maxLength="128"
            />
          </div>
          <div className="btn-container">
            <button className="btn">
            Sign In
            </button>
          </div>
        </form>
        <div className="flex justify-center m-4">
          <h1 className="text-sm text-gray-400">
            Not yet registered?&nbsp;
            <a className="hover:text-blue-400" href="/signup" onClick={handleCLick}>
            Click here to sign up.
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;