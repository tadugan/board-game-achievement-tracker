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

function BoardgameDetails({ displayCollection }) {

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

  const removeFromCollection = (gameId) => {
      console.log('gameId is:', gameId); // test
      console.log('This is where we would remove the game'); // test
      // TODO:
  }

  const contextualButtons = () => {
      if (displayCollection) {
          return (
            <>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFromCollection(params.id)}
                    >
                        Remove from Collection
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => routeUser('/collection')}
                    >
                        Return to Collection
                    </Button>
                </Grid>
            </>
          );
      }
      else {
          return (
            <>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => addToCollection(params.id)}
                    >
                        Add To Collection
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => routeUser('/boardgame')}
                    >
                        Return to List
                    </Button>
                </Grid>
            </>
          );
      }
  }

  const contextualBackButton = () => {
      if (displayCollection) {
        return (
            <BackButton destination="/collection"/>
        );
      }
      else {
        return (
            <BackButton destination="/boardgame"/>
        );
      }
  }

  const routeUser = (destination) => {
    history.push(destination);
  }

  const testLogProps = () => {
    console.log('displayCollection is:', displayCollection); // test
  }

  useEffect(() => {
    getBoardgameDetails(params.id);
    testLogProps();
  }, []);

  return (
    <div className={classes.root}>
      <h2>Game Details</h2>
      {contextualBackButton()}
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
            {contextualButtons()}
            <Grid item xs={10}>
                <h3>Achievements:</h3>
            </Grid>
                {boardgameAchievements.map((achievement, index) => {
                    return (
                        <Grid item xs={10} key={index}>
                            <AchievementCard achievement={achievement} displayCollection={displayCollection} />
                        </Grid>
                    );
                })}
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
