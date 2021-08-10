import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  logout: {
    textAlign: "center",
    width: "200px",
    margin: "16px 0",

  },
});

function LogOutButton(props) {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Button
      className={classes.logout}
      onClick={() => dispatch({ type: 'LOGOUT' })}
      variant="contained"
      color="secondary"
    >
      Logout
    </Button>
  );
}

export default LogOutButton;
