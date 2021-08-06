import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { CheckBoxOutlined } from '@material-ui/icons';

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
  });

function AchievementCard({ achievement, displayCollection }) {

  const classes = useStyles();

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
    if (displayCollection) {
        return (
          <Grid item xs={4}>
            <Button> 
              <CheckBoxOutlined className={classes.checkbox}/>
            </Button>
          </Grid>
        );
    }
    else {
        return;
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
