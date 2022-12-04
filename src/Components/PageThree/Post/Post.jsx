import React from 'react';

import classes from './Post.module.css';

const Post = (props) => {
  return (
    <>
      <div className={classes.post}>{props.postBody}</div>
    </>
  );
};

export default Post;
