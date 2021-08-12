import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBoxOutlined, InsertEmoticon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    achievementTitle: {
        margin: "16px 0px",
    },
    requirement: {
        fontSize: "16px",
        margin: "0 0 8px 8px",
    },
    status: {
      fontSize: "12px"
    },
    card: {
        width: 320,
        margin: "8px 0 8px 0",
    },
    checkbox: {
        fontSize: '2.5rem',
    },
    emoticon: {
      fontSize: '2.5rem',
    },
    difficulty_hard: {
      fontSize: '1rem',
      backgroundColor: "salmon",
      padding: "8px 0 8px 0",
    },
    difficulty_moderate: {
      fontSize: '1rem',
      backgroundColor: "lightgreen",
      padding: "8px 0 8px 0",
    },
    difficulty_easy: {
      fontSize: '1rem',
      backgroundColor: "lightblue",
      padding: "8px 0 8px 0",
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
              <CheckBoxOutlineBlank className={classes.checkbox}/>
            </Button>
          </Grid>
        );
    }
    else {
        return (
          <Grid item xs={4}>
            <CheckBoxOutlined className={classes.emoticon}/>
          </Grid>
        );
    }
  }

  const checkDifficulty = (difficulty) => {
    switch (difficulty) {
      case "hard":
        return (
          classes.difficulty_hard
        );
      case "moderate":
        return (
          classes.difficulty_moderate
        );
      case "easy":
        return (
          classes.difficulty_easy
        );
      default:
        break;
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
                  <h4 className={classes.achievementTitle}>{achievement.title}</h4>
                  <p className={classes.requirement}>{achievement.requirement}</p>
            </Grid>
            {conditionalStatus()}
          </Grid>
          {conditionalCheckbox()}
          <Grid item xs={12} className={checkDifficulty(achievement.difficulty)}>
            {achievement.difficulty}
          </Grid>
      </Grid>
    </Card>
  );
}

export default AchievementCard;
