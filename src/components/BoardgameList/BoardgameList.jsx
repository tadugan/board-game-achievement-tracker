import { Grid } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import BoardgameCard from '../BoardgameCard/BoardgameCard';


function BoardgameList() {

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
                <BoardgameCard game={game}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default BoardgameList;
