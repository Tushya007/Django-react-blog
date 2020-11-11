import React, { useState,useEffect } from 'react';
import './Home.css';
import axios from 'axios';

const Home = ({isLoggedIn}) => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios
    .get('https://tushya007.pythonanywhere.com/blog/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  if(isLoggedIn){
    return (
      <div className='home'>
        {data.map((blog, i) => (
          <div className='home__blogs'>
            <div className='home__title'>{blog.title}</div>
            <hr className="home__hr"/>
            <div className='home__content'>{blog.content}</div>
          </div>
        ))}
      </div>
    );
  }else{
    return(
      <div className="home__notlog">
        <h3 className="notlog__h1">Please login to view post</h3>
        <hr className="notlog__hr"/>
      </div>
    )
  }
};

export default Home;
