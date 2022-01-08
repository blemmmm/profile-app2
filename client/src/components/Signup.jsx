import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Signup (props) {
  const [full_name, set_full_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [username, set_username] = useState('');
  const [type, set_type] = useState('');

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'name': full_name,
          'email': email,
          'username': username,
          'password': password,
          'type': type,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          title: 'Congratulations!',
          text: data.message,
          icon: 'success',
        });
        props.history.push('/signin');
      } else {
        Swal.fire({
          title: 'ERROR',
          text: data.message,
          icon: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'ERROR',
        text: 'Sign up failed',
        icon: 'error',
      });
    }

  };

  const handle_click = (e) => {
    e.preventDefault();
    props.history.push('/signin');
  };

  return (
    <div>
      <div className="flex-justify-center pt-28 pb-6">
        <h1 className="text-5xl">Create your account</h1>
      </div>
      <div className="flex-justify-center pb-5">
        <h1 className="text-sm text-gray-400">
          It&apos;s free and only takes a minute.
        </h1>
      </div>
      <div className="signin-container">
        <form onSubmit={handle_submit} className="create-form">
          <div className="mb-4">
            <label className="input-label" htmlFor="name">
              Full Name
            </label>
            <input
              value={full_name}
              onChange={(e) => set_full_name(e.target.value)}
              className="input-text"
              id="name"
              type="text"
              placeholder="Full name"
              required
            />
          </div>
          <div className="radio-div">
            <label className="radio-group">
              <input
                type="radio"
                name="type"
                value="Admin"
                onChange={(e) => set_type(e.target.value)}
                required/>
              <span className="radio-span">Admin</span>
            </label>
            <label className="radio-group">
              <input
                type="radio"
                name="type"
                value="User"
                onChange={(e) => set_type(e.target.value)}
                required/>
              <span className="radio-span">User</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => set_username(e.target.value)}
              className="input-text"
              id="username"
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => set_email(e.target.value)}
              className="input-text"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => set_password(e.target.value)}
              className="input-text"
              id="pw"
              type="password"
              minLength="6"
              maxLength="128"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center m-4">
        <h1 className="text-sm text-gray-400">
            Already have an account?&nbsp;
          <a className="hover:text-blue-400" href="/" onClick={handle_click}>
            Click here to sign in.
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Signup;