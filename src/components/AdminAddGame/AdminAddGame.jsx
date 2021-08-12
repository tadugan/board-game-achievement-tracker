import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
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
    snackbar: {
      width: '100%',
      '& > * + *': {
        marginTop: "16px",
      },
    },
  });

function AdminAddGame() {

  const classes = useStyles();

  const dispatch = useDispatch();

  const [ gameTitle, setGameTitle ] = useState('');
  const [ publisherName, setPublisherName ] = useState('');
  const [ gameDescription, setGameDescription ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

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

  const addGame = () => {
      event.preventDefault();
      console.log('ADD GAME NOW'); // test
      console.log(gameTitle, publisherName, gameDescription, imageUrl); // test

      dispatch({ type: 'ADMIN_ADD_NEW_GAME', payload: {
          name: gameTitle,
          publisher: publisherName,
          description: gameDescription,
          image_url: imageUrl
          } 
      });

      // Display snackbar
      handleClick();

      // clear inputs
      setGameTitle('');
      setPublisherName('');
      setGameDescription('');
      setImageUrl('');
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
                  <TextField 
                    required 
                    label="Game Title" 
                    variant="filled" 
                    className={classes.textfield}
                    value={gameTitle}
                    onChange={(event) => setGameTitle(event.target.value)}  
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <TextField 
                    required 
                    label="Publisher Name" 
                    variant="filled" 
                    className={classes.textfield}
                    value={publisherName}
                    onChange={(event) => setPublisherName(event.target.value)} 
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input}>
                  <TextField 
                    required 
                    label="Description" 
                    variant="filled" 
                    multiline 
                    rows={8} 
                    className={classes.textfield}
                    value={gameDescription}
                    onChange={(event) => setGameDescription(event.target.value)}  
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input} >
                  <TextField 
                    required 
                    label="Image URL" 
                    variant="filled" 
                    className={classes.textfield}
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}  
                  />
              </Grid>
              <Grid item xs={12} variant="filled" className={classes.input} >
              </Grid> 
              <Grid item xs={12} className={classes.submit}>
                  <Button type="submit" variant="contained">
                      Add New Game
                  </Button>
              </Grid>
          </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "0px", horizontal: "0px" }}>
        <Alert onClose={handleClose} severity="success">
          Game sent to Database!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminAddGame;
