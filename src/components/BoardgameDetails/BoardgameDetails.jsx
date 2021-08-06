import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import AchievementCard from '../AchievementCard/AchievementCard';

const useStyles = makeStyles({
    root: {
      textAlign: "center",
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
  const history = useHistory();
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

  const routeUser = (destination) => {
    history.push(destination);
  }

  useEffect(() => {
    getBoardgameDetails(params.id);
  }, []);

  return (
    <div className={classes.root}>
      <h2>Game Details</h2>
      <BackButton destination="/boardgame"/>
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
                    onClick={() => routeUser('/boardgame')}
                >
                    Return to List
                </Button>
            </Grid>
            <Grid item xs={10}>
                <h3>Achievements:</h3>
            </Grid>
                {boardgameAchievements.map((achievement, index) => {
                    return (
                        <Grid item xs={10} key={index}>
                            <AchievementCard achievement={achievement}/>
                        </Grid>
                    );
                })}
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
