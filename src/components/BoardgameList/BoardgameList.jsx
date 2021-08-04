import { Grid } from '@material-ui/core';
import React, { useState } from 'react';


function BoardgameList() {

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
          <Grid item>
            <p>banana</p>
          </Grid>
      </Grid>
    </div>
  );
}

export default BoardgameList;
