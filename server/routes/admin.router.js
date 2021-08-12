const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST
 */
router.post('/boardgame', rejectUnauthenticated, (req, res) => {
  const newGame = req.body;
  const user = req.user;

  const queryText = `
  INSERT INTO "boardgame" ("name", "publisher", "description", "image_url")
  VALUES ($1, $2, $3, $4);
  `;

  if (user.authority >= 10) {
    pool.query(queryText, [newGame.name, newGame.publisher, newGame.description, newGame.image_url])
    .then(reponse => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error adding new game to database. Error:', error);
        res.sendStatus(500);
    });
  }
  else {
      console.log('Error, insufficient authority to access this route.')
      res.sendStatus(500);
  }

  
});

module.exports = router;
