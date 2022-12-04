import React from 'react';

import classes from './PostList.module.css';

import PostListItem from '../PostListItem/PostListItem';

const PostList = (props) => {
  const posts = props.postArray;

  return (
    <>
      <div className={classes.tableHeader}>
        <p>ID No.</p>
        <p>Title</p>
        <p>Author</p>
        <p>Date</p>
        <p>Category</p>
        <p>View</p>
      </div>
      <div className={classes.postList}>
        {posts.map((post) => (
          <PostListItem postObj={post} />
        ))}
      </div>
    </>
  );
};

export default PostList;
