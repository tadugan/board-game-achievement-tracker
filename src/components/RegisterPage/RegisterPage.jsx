import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

const useStyles = makeStyles({
  button: {
    textAlign: "center",
  },
});

function RegisterPage() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div>
      <RegisterForm />
      <h4>Already a User?</h4>
      <center>
        <Button 
          variant="contained" 
          type="button" 
          className={classes.button} 
          onClick={() => {
            history.push('/login');
          }}>
          Login Here
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
