import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Signup (props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'name': fullName,
          'email': email,
          'username': username,
          'password': password,
          'type': type,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.statusCode === 200) {
        Swal.fire({
          title: 'Congratulations!',
          text: data.message,
          icon: 'success',
        });
        props.history.push('/profile-app');
      } else {
        Swal.fire({
          title: 'ERROR',
          text: data.message,
          icon: 'error',
        });
      }
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: 'ERROR',
        text: 'Sign up failed',
        icon: 'error',
      });
    }

  };

  const handleCLick = (e) => {
    e.preventDefault();
    props.history.push('/profile-app');
  };

  return (
    <div>
      <div className="flex justify-center pt-28 pb-6">
        <h1 className="text-5xl">Create your account</h1>
      </div>
      <div className="flex justify-center pb-5">
        <h1 className="text-sm text-gray-400">
          It&apos;s free and only takes a minute.
        </h1>
      </div>
      <div className="flex items-center justify-center pb-2">
        <form onSubmit={handleSubmit} className="p-5 border border-gray-400 rounded-md w-3/12">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full name"
              required
            />
          </div>
          <div className="mb-4 flex flex-row">
            <label className="text-gray-700 pr-4">
              <input type="radio" name="type" value="Admin" onChange={(e) => setType(e.target.value)} required/>
              <span className="ml-1 text-gray-700 text-sm font-bold">Admin</span>
            </label>
            <label className="text-gray-700">
              <input type="radio" name="type" value="User" onChange={(e) => setType(e.target.value)} required/>
              <span className="ml-1 text-gray-700 text-sm font-bold">User</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pw"
              type="password"
              maxLength="128"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center m-4">
        <h1 className="text-sm text-gray-400">
            Already have an account?&nbsp;
          <a className="hover:text-blue-400" href="/" onClick={handleCLick}>
            Click here to sign in.
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Signup;