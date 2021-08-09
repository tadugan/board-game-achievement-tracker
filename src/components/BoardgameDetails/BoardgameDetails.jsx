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
    button: {
        margin: "8px 0 8px 0",
        width: "250px",
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

  const [ displayMode, setDisplayMode ] = useState(displayCollection);

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
            achievements: boardgameAchievements
        }
    });

    getUserAchievements(gameId);

    // send the user to their collection view of the game
    history.push(`/collection/${gameId}`);
  }

  const removeFromCollection = (gameId) => {
    dispatch({ type: 'REMOVE_FROM_COLLECTION', payload: gameId });

    // send the user back to BoardgameList My Collection view
    history.push('/collection');
  }

  const contextualAchievements = () => {
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

  const contextualButtons = () => {
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

  const isThisHappening = () => {
      console.log('useEffect is occuring.');
  }

  useEffect(() => {
    getBoardgameDetails(params.id);
    getUserAchievements(params.id);
    isThisHappening();
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
            {contextualAchievements()}
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
