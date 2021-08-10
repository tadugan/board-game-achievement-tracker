import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    textAlign: "center",
  },
});

function LoginPage() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div>
      <LoginForm />

      <center>
        <h4>New to the app?</h4>
        <Button 
            variant="contained" 
            type="button" 
            className={classes.button} 
            onClick={() => {
              history.push('/registration');
            }}>
            Register Here
          </Button>
      </center>
    </div>
  );
}

export default LoginPage;
