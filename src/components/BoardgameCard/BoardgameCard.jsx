import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxHeight: 300,
      width: 140,
    },
    media: {
      width: 140,
      height: 180,
    },
});

function BoardgameCard({ game, displayCollection }) {
  
  const classes = useStyles();

  const history = useHistory();

  const handleClick = (gameId) => {
    if (displayCollection === "true") {
        history.push(`/collection/${gameId}`);
    }
    else {
        history.push(`/boardgame/${gameId}`);
    }
  }

  return (
    <Card 
        className={classes.root}
        onClick={() => handleClick(game.id)}
    >
        <CardActionArea>
        <CardMedia
            className={classes.media}
            // Adding an alternate image route stops the client from throwing an error before the useEffect gets the image url
            image={game.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Blank_square.svg/1200px-Blank_square.svg.png'}
            title={game.name}
            spacing="0"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {game.name}
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default BoardgameCard;
