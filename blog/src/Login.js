import React, { useState } from 'react';
import './Login.css';

const Login = ({loginFunc}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      "username":username,
      "password":password
    };
    loginFunc(data);
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={submitHandler}>
        <label>Username</label>
        <input
          className='login__username'
          type='text'
          placeholder='Enter your username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Password</label>
        <input
          className='login__password'
          type='password'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className='login__button'>Submit</button>
      </form>
      <hr className='login__hr' />
    </div>
  );
};

export default Login;
