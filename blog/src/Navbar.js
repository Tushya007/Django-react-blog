import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({isLoggedIn}) => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.replace('https://blog-5b3e1.web.app/')
  }
  
  if(isLoggedIn){
    return(
      <div className="navbar">
        <Link to='/' style={{ textDecoration: 'none' }} className='navbar__title'>
          MyBlog
        </Link>
        <Link to='/blog/create' style={{ textDecoration: 'none' }} className='navbar__blog__create'>
          CreateBlog
        </Link>
        <Link to='/' onClick={logout} style={{ textDecoration: 'none' }} className='navbar__logout'>
          Logout
        </Link>
      </div>
    )
    }else{
    return(
      <div className="navbar">
        <Link to='/' style={{ textDecoration: 'none' }} className='navbar__title'>
          MyBlog
        </Link>
        <Link to='/login' style={{ textDecoration: 'none' }} className='navbar__login'>
          Login
        </Link>
        <Link to='/signup' style={{ textDecoration: 'none' }} className='navbar__signup'>
          Signup
        </Link>
      </div>
    )
  }
};

export default Navbar;
