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
      maxWidth: 400,
      margin: "auto",
    },
    container: {
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: "8px 0 8px 0",
        width: "250px",
    },
    image: {
        maxWidth: "140px",
        margin: "0 0 0 16px"
    },
  });

function BoardgameDetails({ displayCollection }) {

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const boardgameDetails = useSelector(store => store.gameDetails);
  const boardgameAchievements = useSelector(store => store.gameAchievements);
  const userAchievements = useSelector(store => store.userAchievements);
  const userCollection = useSelector(store => store.userCollection);

  const [ displayMode, setDisplayMode ] = useState(displayCollection);
  const [ disableAddGame, setDisableAddGame ] = useState(false);

  const getBoardgameDetails = (gameId) => {
    dispatch({ type: 'GET_GAME_DETAILS', payload: { id: gameId }});
    dispatch({ type: 'GET_GAME_ACHIEVEMENTS', payload: { id: gameId }});
  }

  const getUserAchievements = (gameId) => {
    dispatch({ type: 'GET_USER_ACHIEVEMENTS', payload: { id: gameId }})
  }

  const addToCollection = (gameId) => {
    // add a game and all it's achievements to a user's collection
    dispatch({ type: 'ADD_TO_COLLECTION', payload: 
        { 
            id: gameId,
            achievements: boardgameAchievements,
            history: history
        }
    });
  }

  const removeFromCollection = (gameId) => {
    dispatch({ type: 'REMOVE_FROM_COLLECTION', payload:
        {
            id: gameId,
            history: history
        } 
    });
  }

  const viewInCollection = (gameId) => {
      history.push(`/collection/${gameId}`);
  }

  const checkCollection = (gameId) => {
      console.log('CHECKING COLLECTION'); // test
      for (let item of userCollection) {
          if (item.id === Number(gameId)) {
            //   history.push(`/collection/${gameId}`);
            setDisableAddGame(true);
          }
      }
  }

  const conditionalAchievements = () => {
      if (displayMode) {
            return (
                userAchievements.map((achievement, index) => {
                return (
                    <Grid item xs={10} key={index}>
                        <AchievementCard achievement={achievement} displayCollection={displayMode} />
                    </Grid>
                );
            })
            )
      }
      else {
            return (
                boardgameAchievements.map((achievement, index) => {
                return (
                    <Grid item xs={10} key={index}>
                        <AchievementCard achievement={achievement} displayCollection={displayMode} />
                    </Grid>
                );
            })
            )
      }
  }

  const conditionalButtons = () => {
      if (displayMode) {
          return (
            <>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFromCollection(params.id)}
                        className={classes.button}
                    >
                        Remove from Collection
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => routeUser('/collection')}
                        className={classes.button}
                    >
                        Return to Collection
                    </Button>
                </Grid>
            </>
          );
      }
      else if (disableAddGame) {
        return (
            <>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => viewInCollection(params.id)}
                        className={classes.button}
                    >
                        View in Collection
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => routeUser('/boardgame')}
                        className={classes.button}
                    >
                        Return to List
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
                        className={classes.button}
                    >
                        Add To Collection
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => routeUser('/boardgame')}
                        className={classes.button}
                    >
                        Return to List
                    </Button>
                </Grid>
            </>
          );
      }
  }

  const contextualBackButton = () => {
      if (displayMode) {
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

  useEffect(() => {
    getBoardgameDetails(params.id);
    getUserAchievements(params.id);
    checkCollection(params.id);
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
            className={classes.container}
        >
            <Grid
                item
                xs={6}
                className={classes.image}
            >
                <img
                src={boardgameDetails.image_url}
                />
            </Grid>
            <Grid
               item
               container 
               spacing={0}
               xs={6}
               direction="row"
               justifyContent="center"
               alignItems="center" 
            >
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
                    <h5>{boardgameDetails.publisher}</h5>
                </Grid>
            </Grid>
            {conditionalButtons()}
            <Grid item xs={12}>
                <h3>Achievements:</h3>
            </Grid>
            {conditionalAchievements()}
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
