import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxHeight: 300,
    width: 140,
  },
  media: {
    width: 140,
    height: 180,
  },
  container: {
    padding: 20,
  },
});

function BoardgameList() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const games = useSelector(store => store.boardgames);

  const getAllBoardgames = () => {
      console.log('GETting all boardgames to display'); // test

      dispatch({ type: 'GET_ALL_BOARDGAMES' });
  }

  useEffect(() => {
      getAllBoardgames();
  }, []);

  return (
    <div>
      <h2>Boardgame List</h2>
      <Grid 
        container
        spacing={10}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        {games.map((game, index) => {
          return (
            <Grid item key={index} className={classes.container}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={game.image_url}
                      title={game.name}
                      spacing="0"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {game.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Add
                    </Button>
                  </CardActions> */}
                </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default BoardgameList;
