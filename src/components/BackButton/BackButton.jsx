import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { ArrowBackIos } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        textAlign: 'left',
        margin: '0 0 16px 0',
    },
  });

function BackButton({ destination }) {

  const classes = useStyles();
  
  const history = useHistory();

  const handleClick = (route) => {
      history.push(route);
  }

  return (
    <div className={classes.root}>
        <Button
            onClick={() => handleClick(destination)}
        >
            <ArrowBackIos />
            Back
        </Button>
    </div>
  );
}

export default BackButton;
