import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddCircle, Casino, KeyboardReturnOutlined, Person } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#cb804d',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#2d2b26',
  },
});

import './Footer.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {

  const classes = useStyles();

  const history = useHistory();
  const user = useSelector(store => store.user)

  const handleClick = (destination) => {
    history.push(destination);
  }

  // Conditional rendering so the Bottom Nav Bar is only rendered when the user is logged in
  const conditionalNavBar = () => {
    if (user.id) { 
        return (
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
                onClick={() => {handleClick('/collection')}}
              />
              <BottomNavigationAction 
                label="Add Game" 
                icon={<AddCircle className={classes.icon}/>}
                onClick={() => {handleClick('/boardgame')}} 
              />
          </BottomNavigation>
        );
    }
    else {
        return;
    }
  }

  return (
    <footer className={classes.root}>
        {conditionalNavBar()}
    </footer>
  );
}

export default Footer;
