import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { CheckBoxOutlined, InsertEmoticon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    requirement: {
        fontSize: "16px"
    },
    status: {
      fontSize: "12px"
    },
    card: {
        minWidth: 275,
        margin: "8px 0 8px 0",
    },
    checkbox: {
        fontSize: '2.5rem'
    },
    emoticon: {
      fontSize: '2.5rem'
  },
  });

function AchievementCard({ achievement, displayCollection }) {

  const classes = useStyles();

  const dispatch = useDispatch();

  const completeAchievement = (achievementId, boardgameId) => {
    console.log('achievementId is:', achievementId); // test

    dispatch({ type: 'MARK_ACHIEVEMENT_COMPLETE', payload: 
      {
        achievementId,
        boardgameId
      } 
    });
  }

  const conditionalStatus = () => {
    if (achievement.completed === true) {
        return (
          <Grid item>
            <p className={classes.status}>Completed</p>
          </Grid>
        );
    }
    else if (displayCollection) {
        return (
          <Grid item>
            <p className={classes.status}>Incomplete</p>
          </Grid>
        );
    }
    else {
      return;
    }
  }

  const conditionalCheckbox = () => {
    if (achievement.completed === false && displayCollection) {
        return (
          <Grid item xs={4}>
            <Button 
              variant="contained"
              onClick={() => completeAchievement(achievement.id, achievement.boardgame_id)}
            > 
              <CheckBoxOutlined className={classes.checkbox}/>
            </Button>
          </Grid>
        );
    }
    else {
        return (
          <Grid item xs={4}>
            <InsertEmoticon className={classes.emoticon}/>
          </Grid>
        );
    }
  }

  return (
    <Card className={classes.card}>
      <Grid 
        container 
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
          <Grid 
            item 
            container 
            xs={8} 
            direction="column" 
            spacing={1} 
          >
            <Grid item xs>
                  <h4>{achievement.title}</h4>
                  <p className={classes.requirement}>{achievement.requirement}</p>
            </Grid>
            {conditionalStatus()}
          </Grid>
          {conditionalCheckbox()}
      </Grid>
    </Card>
  );
}

export default AchievementCard;
