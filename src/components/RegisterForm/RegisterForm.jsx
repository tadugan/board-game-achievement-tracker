import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        profileImage: profileImage
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
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
          <TextField 
            id="firstName" 
            label="First Name" 
            variant="filled"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
            className={classes.input}  
          /> 
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="lastName" 
            label="Last Name" 
            variant="filled"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className={classes.input}  
          /> 
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="profileImage" 
            label="Profile Picture URL" 
            variant="filled"
            value={profileImage}
            onChange={(event) => setProfileImage(event.target.value)}
            className={classes.input}  
          /> 
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit" className={classes.submit}>
          Register
        </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
