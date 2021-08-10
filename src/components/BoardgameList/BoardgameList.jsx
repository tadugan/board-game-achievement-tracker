import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import BoardgameCard from '../BoardgameCard/BoardgameCard';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    maxWidth: 540,
    margin: "auto",
  },
});

function BoardgameList( {displayCollection} ) {

  const classes = useStyles();

  const dispatch = useDispatch();
  const games = useSelector(store => store.boardgames);
  const [ pageHeader, setPageHeader ] = useState('Boardgames');

  const getAllBoardgames = () => {
      dispatch({ type: 'GET_ALL_BOARDGAMES' });
  }

  const getUserCollection = () => {
      dispatch({ type: 'GET_USER_COLLECTION' });
  }

  const displayGames = () => {
    if (displayCollection) {
      getUserCollection();
      setPageHeader('My Collection');
    }
    else {
      getAllBoardgames();
    }
  }


  useEffect(() => {
      displayGames();
  }, []);

  return (
    <div className={classes.root}>
      <h2>{pageHeader}</h2>
      <BackButton destination="/user" />
      <Grid 
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        {games.map((game, index) => {
          return (
            <Grid item key={index}>
                <BoardgameCard game={game} displayCollection={displayCollection} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default BoardgameList;
