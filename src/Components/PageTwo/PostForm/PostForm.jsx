import React, { useRef } from 'react';

import classes from './PostForm.module.css';

const PostForm = (props) => {
  const new_title = useRef('');
  const new_postBody = useRef('');
  const new_category = useRef('');

  const createPostHandler = (event) => {
    event.preventDefault();

    const key = Math.floor(Math.random() * 10000);
    const title = new_title.current.value;
    new_title.current.value = '';
    const author = props.author;
    const postBody = new_postBody.current.value;
    new_postBody.current.value = '';

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const postDate = `${mm}/${dd}/${yyyy}`;

    const category = new_category.current.value;
    new_category.current.value = '';

    if (key && title && postBody && category) {
      const newObj = {
        // id: id,
        postTitle: title,
        postAuthor: author,
        postBody: postBody,
        postDate: postDate,
        category: category,
        key: key,
      };

      props.addNewPosts(newObj);
    }
  };

  return (
    <>
      <h1 className={classes.title}>Create New Post</h1>
      <form className={classes.form} action=''>
        <div className='postTitle'>
          <label className={classes.labels} htmlFor='post_title'>
            Title:
          </label>
          <input
            ref={new_title}
            className={classes.inputs}
            type='text'
            name='name'
            id='name'
          />
        </div>
        <div>
          <label className={classes.labels} htmlFor='postBody'>
            Post:
          </label>
          <textarea
            ref={new_postBody}
            className={`${classes.postBody} ${classes.inputs}`}
            type='textarea'
            name='postBody'
            id='postBody'
            placeholder='write your thoughts here...'
          />
        </div>
        <div className='postCategory'>
          <label className={classes.labels} htmlFor='category'>
            Category:
          </label>
          <input
            ref={new_category}
            className={classes.inputs}
            type='category'
            name='category'
            id='category'
          />
        </div>
        <button
          className={classes.createPostButton}
          onClick={createPostHandler}
        >
          Create New Post
        </button>
      </form>
    </>
  );
};

export default PostForm;
