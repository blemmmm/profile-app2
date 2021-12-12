import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import assert from 'assert';

function Login (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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


      if (data.statusCode === 400) {
        Swal.fire({
          title: 'ERROR',
          text: data.message,
          icon: 'error',
        });

      } else {
        const user = data.user;
        set_user(user);
        Swal.fire({ text: data.message, icon: 'success' });
        props.history.push('/profile-app/Profile');
      }


    } catch (err) {
      console.log(err.message);
      Swal.fire({
        text: 'Network error.',
        icon: 'error',
      });
    }

  };

  const handleCLick = (e) => {
    e.preventDefault();
    props.history.push('/profile-app/Signup');
  };
  return (
    <div>
      <div className="flex justify-center items-center pt-28 pb-5">
        <h1 className="text-5xl">Sign In</h1>
      </div>
      <div className="flex items-center justify-center flex-col pb-52">
        <form onSubmit={handleSubmit} className="w-96 p-5 border border-gray-400 rounded-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
            Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
            />
          </div>
          <div className="mb-4 pt-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
            Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pw"
              type="password"
              maxLength="128"
            />
          </div>
          <div className="flex items-center justify-between flex-col pt-10">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
            </button>
          </div>
        </form>
        <div className="flex justify-center m-4">
          <h1 className="text-sm text-gray-400">
            Not yet registered?&nbsp;
            <a className="hover:text-blue-400" href="/Signup" onClick={handleCLick}>
            Click here to sign up.
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;