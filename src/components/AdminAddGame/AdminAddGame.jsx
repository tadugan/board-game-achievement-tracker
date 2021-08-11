import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';

const useStyles = makeStyles({
    input: {
      margin: "8px 0 8px 0",
    },
    textfield: {
        width: "300px",
    },
    submit: {
      margin: "16px 0 0 0"
    },
  });

function AdminAddGame() {

  const classes = useStyles();

  const addGame = () => {
      event.preventDefault();
      console.log('ADD GAME NOW'); // test

  }

  return (
    <div>
      <form 
        autoComplete="off"
        onSubmit={addGame}
      >
          <Grid
            container 
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
              <Grid item xs={12} className={classes.input}>
                  <TextField required label="Game Title" variant="filled" className={classes.textfield} />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <TextField required label="Publisher Name" variant="filled" className={classes.textfield} />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <TextField required label="Description" variant="filled" className={classes.textfield} />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input} >
                  <TextField required label="Image URL" variant="filled" multiline rows={4} className={classes.textfield} />
              </Grid>
              <Grid item xs={12} className={classes.submit}>
                  <Button type="submit" variant="contained">
                      Add New Game
                  </Button>
              </Grid>
          </Grid>
      </form>
    </div>
  );
}

export default AdminAddGame;
