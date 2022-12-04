import React from 'react';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loadingbg}>
      <h1 className={classes.loading}>Loading...</h1>;
    </div>
  );
};

export default Loading;
