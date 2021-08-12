import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import AdminAddAchievement from '../AdminAddAchievement/AdminAddAchievement';
import AdminAddGame from '../AdminAddGame/AdminAddGame';

const useStyles = makeStyles({
  buttonGroup: {
    margin: "0px 0 24px 0",
  },
});

function Admin() {

  const classes = useStyles();

  const [ adminDisplay, setAdminDisplay ] = useState('Add Game');
  const [ pageHeader, setPageHeader ] = useState('Admin')

  const changeDisplayMode = (mode) => {
    setAdminDisplay(mode);
  }

  const conditionalAdminPage = () => {
    if (adminDisplay === 'Add Game') {
        return (
            <AdminAddGame />
        );
    }
    else if (adminDisplay === 'Add Achievement') {
        return (
            <AdminAddAchievement />
        );
    }
    else {
        return (
            <h5>Something has gone wrong...</h5>
        );
    }
  }

  return (
    <div>
      <h2>{pageHeader}</h2>
      <ButtonGroup 
        color="primary"
        variant="contained"
        className={classes.buttonGroup}
      >
        <Button onClick={() => changeDisplayMode('Add Game')}>Add Game</Button>
        <Button onClick={() => changeDisplayMode('Add Achievement')}>Add Achievement</Button>
      </ButtonGroup>
      {conditionalAdminPage()}
    </div>
  );
}

export default Admin;