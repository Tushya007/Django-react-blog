import React, { useState } from 'react';
import './CreateBlog.css';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };
    axios
      .post('https://tushya007.pythonanywhere.com/blog/create/', data, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        window.location.replace('https://blog-5b3e1.web.app/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='createBlog'>
      <div className='createBlog__create'>
        <form className='createBlog__form' onSubmit={submitHandler}>
          <label>Title</label>
          <input
            type='text'
            placeholder='Enter title here'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label>Content</label>
          <textarea
            className='createBlog__blog__content'
            type='text'
            placeholder='Enter content here'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button>Submit</button>
        </form>
      </div>
      <hr className='createBlog__hr' />
    </div>
  );
};

export default CreateBlog;
