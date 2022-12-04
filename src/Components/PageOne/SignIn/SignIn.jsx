import React, { useRef, useCallback } from 'react';

import classes from './SignIn.module.css';

const SignIn = (props) => {
  const new_email = useRef('');
  const new_password = useRef('');

  const hashCode = (s) =>
    s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

  const signInHandler = (event) => {
    event.preventDefault();

    const newEmail = new_email.current.value;
    new_email.current.value = '';
    const intPass = hashCode(new_password.current.value);
    const newPassword = intPass.toString();
    new_password.current.value = '';

    const user = {
      email: newEmail,
      password: newPassword,
    };

    if (newEmail && newPassword) {
      userCheckHandler(user);
    }
  };

  const { setIsLoading, setAuthor, setPageState } = props;

  const userCheckHandler = useCallback(
    async (newUser) => {
      let authorName = '';
      setIsLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:5000/users', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log(response);
        }
        authorName = await response.json();
        console.log(authorName);
      } catch (error) {
        console.log(error);
      }

      if (authorName) {
        setAuthor(authorName);
        setPageState('LoggedIn');
      }
      setIsLoading(false);
    },
    [setIsLoading, setAuthor, setPageState]
  );

  return (
    <>
      <h1 className={classes.title}>Sign In</h1>
      <form className={classes.form} action=''>
        <label className={classes.labels} htmlFor='email'>
          Email
        </label>
        <input
          ref={new_email}
          className={classes.inputs}
          type='email'
          name='email'
          id='email'
          placeholder='example@oneture.com'
        />
        <label className={classes.labels} htmlFor='password'>
          Password
        </label>
        <input
          ref={new_password}
          className={classes.inputs}
          type='password'
          name='password'
          id='password'
          placeholder='hope it is not "password"'
        />
        <button className={classes.signInButton} onClick={signInHandler}>
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignIn;
