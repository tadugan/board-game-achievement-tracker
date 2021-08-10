import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  input: {
    margin: "8px 0 8px 0",
    width: "250px"
  },
  submit: {
    margin: "16px 0 0 0"
  },
});

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid
        container 
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <TextField 
            id="username" 
            label="Username" 
            variant="filled"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            className={classes.input} 
          /> 
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="password"
            type="password" 
            label="Password" 
            variant="filled"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            className={classes.input} 
          /> 
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" className={classes.submit}>
          Login
        </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
