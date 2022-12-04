import React, { useCallback, useState } from 'react';

import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';
import Loading from '../../../UI/Loading/Loading';

const Posting = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const newPostHandler = useCallback(async (newObj) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/posts', {
        method: 'POST',
        body: JSON.stringify(newObj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log(response);
      }
      setPosts(await response.json());
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <div>
          <PostForm author={props.author} addNewPosts={newPostHandler} />
          <PostList postArray={posts} />
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Posting;
