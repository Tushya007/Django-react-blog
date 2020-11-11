import React, { useState } from 'react';
import './Signup.css'

const Signup = ({signupFunc}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password
    };
    signupFunc(data);
  };
  return (
    <div className='signup'>
      <form className='signup__form' onSubmit={submitHandler}>
        <label>Username</label>
        <input
          className='signup__username'
          type='text'
          placeholder='Enter your username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>E-mail</label>
        <input
          className='signup__username'
          type='text'
          placeholder='Enter your username'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          className='signup__password'
          type='password'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className='signup__button'>Submit</button>
      </form>
      <hr className='signup__hr' />
    </div>
  )
};

export default Signup;
