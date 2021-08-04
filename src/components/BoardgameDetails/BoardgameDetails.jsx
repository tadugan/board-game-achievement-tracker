import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
      textAlign: "center",
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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
  const params = useParams(); 

  const getBoardgameDetails = (gameId) => {
    console.log('gameId is:', gameId); // test

    dispatch({ type: 'GET_GAME_DETAILS', payload: { id: gameId }});
  }

  useEffect(() => {
    getBoardgameDetails(params.id);
  }, []);

  return (
    <div>
      <h2>Boardgame Details</h2>
      <p>Game Id: {params.id}</p>
      <div>
        <Grid 
            container 
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid 
                item 
                xs={5}
            >
                <img 
                src="https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__opengraph/img/_PznTHzy-oaTKt6SEVzuhxcCRsw=/fit-in/1200x630/filters:strip_icc()/pic3918905.png" 
                height="150px"
                width="150px"
                />
            </Grid>
            <Grid
                item
                xs={4}
            >
                <div>PUBLISHER</div>
                <div>DATE</div>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <h3>GAME TITLE</h3>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    variant="contained"
                    color="secondary"
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
                >
                    Return to List
                </Button>
            </Grid>
            <Grid
                item
                xs={7}
            >
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        Achievement Title
                        </Typography>
                        <Typography variant="body2" component="p">
                        Achievement Requirement
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BoardgameDetails;
