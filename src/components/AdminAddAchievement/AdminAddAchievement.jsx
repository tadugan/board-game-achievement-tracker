import { Button, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    input: {
      margin: "8px 0 8px 0",
    },
    textfield: {
        width: "300px",
    },
    submit: {
      margin: "16px 0 0 0",
      marginBottom: "32px",
    },
    select: {
      width: "200px",
    },
    snackbar: {
      width: '100%',
      '& > * + *': {
        marginTop: "16px",
      },
      marginBottom: "104px",
    },
  });

function AdminAddAchievement() {

  const classes = useStyles();

  const dispatch = useDispatch();

  const boardgames = useSelector(store => store.boardgames);

  const [ achievementTitle, setAchievementTitle ] = useState('');
  const [ achievementRequirement, setAchievementRequirement ] = useState('');
  const [ achievementGame, setAchievementGame ] = useState('');
  const [ achievementDifficulty, setAchievementDifficulty ] = useState('');

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addAchievement = () => {
      event.preventDefault();

      dispatch({ type: 'ADMIN_ADD_NEW_ACHIEVEMENT', payload: {
          title: achievementTitle,
          requirement: achievementRequirement,
          difficulty: achievementDifficulty,
          gameId: achievementGame
          } 
      });

      // Display snackbar
      handleClick();

      // clear inputs
      setAchievementTitle('');
      setAchievementRequirement('');
      setAchievementGame('');
      setAchievementDifficulty('');
  }

  const getAllBoardgames = () => {
    dispatch({ type: 'GET_ALL_BOARDGAMES' });
  }

  useEffect(() => {
    getAllBoardgames();
  }, []);

  return (
    <div>
      <form 
        autoComplete="off"
        onSubmit={addAchievement}
      >
          <Grid
            container 
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <InputLabel id="game-selector">Select a Game</InputLabel>
                  <Select
                    labelId="game-selector"
                    value={achievementGame}
                    onChange={(event) => setAchievementGame(event.target.value)}
                    className={classes.select}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {boardgames.map((game, index) => {
                      return (
                        <MenuItem key={index} value={game.id}>{game.name}</MenuItem>
                      );
                    })}
                  </Select>
              </Grid>
              <Grid item xs={12} className={classes.input}>
                  <TextField 
                    required 
                    label="Achievement Title" 
                    variant="filled" 
                    className={classes.textfield}
                    value={achievementTitle}
                    onChange={(event) => setAchievementTitle(event.target.value)}
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <TextField 
                    required 
                    label="Requirement" 
                    variant="filled" 
                    className={classes.textfield}
                    value={achievementRequirement}
                    onChange={(event) => setAchievementRequirement(event.target.value)} 
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <InputLabel id="difficulty-selector">Select a difficulty</InputLabel>
                  <Select
                    labelId="difficulty-selector"
                    value={achievementDifficulty}
                    onChange={(event) => setAchievementDifficulty(event.target.value)}
                    className={classes.select}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
              </Grid>
              <Grid item xs={12} className={classes.submit}>
                  <Button type="submit" variant="contained">
                      Add New Achievement
                  </Button>
              </Grid>
          </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} className={classes.snackbar}>
        <Alert onClose={handleClose} severity="success">
          Achievement sent to Database!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminAddAchievement;
