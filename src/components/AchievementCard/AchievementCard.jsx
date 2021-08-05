import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
  });

function AchievementCard({ achievement }) {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardContent>
            <Typography variant="h5" component="h2">
                {achievement.title}
            </Typography>
            <Typography variant="body2" component="p">
                {achievement.requirement}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default AchievementCard;
