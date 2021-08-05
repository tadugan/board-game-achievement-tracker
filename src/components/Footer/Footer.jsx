import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddCircle, Casino, Person } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  icon: {
    fontSize: '2.5rem',
  },
});

import './Footer.css';
import { useHistory } from 'react-router-dom';

function Footer() {

  const classes = useStyles();

  const history = useHistory();

  const handleClick = (destination) => {
    history.push(destination);
  }

  return (
    <footer className={classes.root}>
      <BottomNavigation
        showLabels
        className={classes.stickToBottom}
        style={{ height: '80px'}}
      >
        <BottomNavigationAction 
          label="Profile" 
          icon={<Person className={classes.icon}/>}
          onClick={() => {handleClick('/user')}}
        />
        <BottomNavigationAction 
          label="Collection" 
          icon={<Casino className={classes.icon}/>}
          onClick={() => {handleClick('/user')}}
        />
        <BottomNavigationAction 
          label="Add Game" 
          icon={<AddCircle className={classes.icon}/>}
          onClick={() => {handleClick('/boardgame')}} 
        />
      </BottomNavigation>
    </footer>
  );
}

export default Footer;
