import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import CreateBlog from './CreateBlog';
import axios from 'axios';

function App() {
  const login = (_data) => {
    axios
      .post('https://tushya007.pythonanywhere.com/user/login/', _data)
      .then((response) => {
        localStorage.setItem('token', response.data.user.token);
        window.location.replace('https://blog-5b3e1.web.app/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signup = (_data) => {
    axios
      .post('https://tushya007.pythonanywhere.com/user/create/', _data)
      .then((response) => {
        localStorage.setItem('token', response.data.user.token);
        window.location.replace('https://blog-5b3e1.web.app/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  React.useEffect(() => {
    if (typeof localStorage.getItem('token') === 'string') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem('token')]);

  return (
    <div className='app'>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
        integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2'
        crossOrigin='anonymous'
      />
      <Router>
        <Navbar isLoggedIn={loggedIn} />
        <Switch>
          <Route path='/login'>
            <Login loginFunc={login} />
          </Route>
          <Route path='/signup'>
            <Signup signupFunc={signup} />
          </Route>
          <Route path='/blog/create'>
            <CreateBlog />
          </Route>
          <Route path='/'>
            <Home isLoggedIn={loggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
