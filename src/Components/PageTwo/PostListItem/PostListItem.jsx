import React, { useState } from 'react';

import classes from './PostListItem.module.css';

import Post from '../../PageThree/Post/Post';

const PostListItem = (props) => {
  const { key, postTitle, postBody, author, postDate, category } =
    props.postObj;

  const [isClicked, setIsClicked] = useState(false);

  const postClickHandler = () => {
    setIsClicked(!isClicked);
  };

  const bgClickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <p>{key}</p>
      <p>{postTitle}</p>
      <p>{author}</p>
      <p>{postDate}</p>
      <p>{category}</p>
      <p className={classes.fullV} onClick={postClickHandler}>
        full post...
      </p>
      {isClicked && (
        <div className={classes.bg} onClick={bgClickHandler}>
          <Post postBody={postBody}>View</Post>
        </div>
      )}
    </>
  );
};

export default PostListItem;
