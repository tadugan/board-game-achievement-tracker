import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AchievementCard from '../AchievementCard/AchievementCard';
import { Grid, makeStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
  },
  achievement: {
    maxWidth: 352,
    margin: "0px"
  },
  button: {
    margin: "16px",
    width: "200px",
  },
  image: {
    margin: "0 0 0 20px",
    width: 100,
    height: 100,
  },
  name: {
    margin: "0 20px 0 0",
  },
});

function UserPage() {

  const classes = useStyles();

  const user = useSelector((store) => store.user);
  const achievements = useSelector(store => store.profileAchievement);

  const history = useHistory();
  const dispatch = useDispatch();


  // Sends the user to a destination component when a button is pressed
  const handleClick = (destination) => {
    console.log('click'); // test
    
    history.push(destination);
  }

  // GETs achievements to display on the user's profile
  const getProfileAchievements = () => {
    console.log('in getProfileAchievements'); // test

    dispatch({ type: 'GET_PROFILE_ACHIEVEMENTS'});
  }

  const conditionalProfileImage = () => {
    if (user.profile_image_url) {
      return (
        <img src={user.profile_image_url} className={classes.image}/>
      );
    }
    else {
      return (
        <Person className={classes.image}/>
      );
    }
  }

  useEffect(() => {
    getProfileAchievements();
  }, []);

  return (
    <div className={classes.root}>
      <h2>Profile</h2>
      <Grid 
        container 
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid 
          item 
          container 
          spacing={0}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={6}>
            {conditionalProfileImage()}
          </Grid>
          <Grid item xs={6}>
            <h3 className={classes.name}>{user.first_name} {user.last_name}</h3>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h4>Current Favorite Game: {user.current_favorite_game}</h4>
        </Grid>
        <Grid item xs={12}>
          <h5>Recent Achievements</h5>
        </Grid>
        {achievements.map((achievement, index) => {
              return (
                  <Grid item xs={12} md={12} key={index} className={classes.achievement}>
                    <AchievementCard achievement={achievement}/>
                  </Grid>
              );
        })}
        <Grid item xs={12}>
          <Button
            type="button"
            onClick={() => handleClick('/collection')}
            variant="contained"
            className={classes.button}
          >
            View Collection
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            onClick={() => handleClick('/boardgame')}
            variant="contained"
            className={classes.button}
          >
            Add New Game
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            onClick={() => handleClick('/admin')}
            variant="contained"
            className={classes.button}
          >
            Admin
          </Button>
        </Grid>
        <Grid item xs={7}>
          <LogOutButton className="btn" />
        </Grid>
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
