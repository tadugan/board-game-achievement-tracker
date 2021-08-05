import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
      textAlign: "center",
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
  });

function BoardgameDetails() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const params = useParams();
  const boardgameDetails = useSelector(store => store.gameDetails);
  const boardgameAchievements = useSelector(store => store.gameAchievements);

  const getBoardgameDetails = (gameId) => {
    dispatch({ type: 'GET_GAME_DETAILS', payload: { id: gameId }});
    dispatch({ type: 'GET_GAME_ACHIEVEMENTS', payload: { id: gameId }});
  }

  const addToCollection = (gameId) => {
    dispatch({ type: 'ADD_TO_COLLECTION', payload: 
        { 
            id: gameId,
            achievements: boardgameAchievements
        }
    })
  }

  useEffect(() => {
    getBoardgameDetails(params.id);
  }, []);

  return (
    <div className={classes.root}>
      <h2>Game Details</h2>
      <div>
        <Grid 
            container 
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid 
                item 
                xs={5}
            >
                <img 
                src={boardgameDetails.image_url} 
                height="150px"
                width="150px"
                />
            </Grid>
            <Grid
                item
                xs={4}
            >
                <div>{boardgameDetails.publisher}</div>
                <div>DATE</div>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <h3>{boardgameDetails.name}</h3>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCollection(params.id)}
                >
                    Add To Collection
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    variant="contained"
                    color="primary"
                >
                    Return to List
                </Button>
            </Grid>
            <Grid
                item
                xs={10}
            >
                <h3>Achievements:</h3>
                {boardgameAchievements.map((achievement, index) => {
                    return (
                        <Card className={classes.card} key={index}>
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
                })}
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
