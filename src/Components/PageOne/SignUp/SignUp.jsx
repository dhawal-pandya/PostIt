import React, { useRef, useCallback } from 'react';

import classes from './SignUp.module.css';

const SignUp = (props) => {
  const new_name = useRef('');
  const new_email = useRef('');
  const new_password = useRef('');

  const hashCode = (s) =>
    s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

  const signUpHandler = (event) => {
    event.preventDefault();

    const newId = Math.floor(Math.random() * 1000);
    const newName = new_name.current.value;
    new_name.current.value = '';
    const newEmail = new_email.current.value;
    new_email.current.value = '';
    const intPass = hashCode(new_password.current.value);
    const newPassword = intPass.toString();
    new_password.current.value = '';

    const newPoster = {
      id: newId,
      name: newName,
      email: newEmail,
      password: newPassword,
    };

    if (newId && newName && newEmail && newPassword) {
      newUserHandler(newPoster);
    }
  };

  const { setIsLoading, setPageState } = props;

  const newUserHandler = useCallback(
    async (newUser) => {
      setIsLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:5000/user', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }

      setPageState('SignIn');
      setIsLoading(false);
    },
    [setIsLoading, setPageState]
  );

  return (
    <>
      <h1 className={classes.title}>Sign Up</h1>

      <form className={classes.form} action=''>
        <label className={classes.labels} htmlFor='name'>
          Name
        </label>
        <input
          ref={new_name}
          className={classes.inputs}
          type='text'
          name='name'
          id='name'
        />
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
        <br />
        <label className={classes.labels} htmlFor='password'>
          Password
        </label>
        <input
          ref={new_password}
          className={classes.inputs}
          type='password'
          name='password'
          id='password'
          placeholder='"password" is a bad password'
        />
        <button className={classes.signUpButton} onClick={signUpHandler}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
