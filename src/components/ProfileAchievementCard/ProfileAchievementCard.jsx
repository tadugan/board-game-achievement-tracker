import { Card, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';

const useStyles = makeStyles({
    card: {
        width: 320,
        margin: "8px 0 8px 0",
    },
    title: {
        margin: "8px 0 8px 0",
    },
    boardgame: {
        margin: "8px 0 8px 0",
    },
  });

function ProfileAchievementCard( {achievement} ) {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <Grid 
            container  
            direction="column" 
            spacing={0} 
        >
            <Grid item xs={12}>
                <h3 className={classes.title}>{achievement.title}</h3>
            </Grid>
            <Grid item xs={12}>
                <h4 className={classes.boardgame}>{achievement.name}</h4>
            </Grid>
        </Grid>
    </Card>
  );
}

export default ProfileAchievementCard;
