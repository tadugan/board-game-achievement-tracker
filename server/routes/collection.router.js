const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const gameId = req.body.id;
  const user = req.user.id;

  const queryText = `
  INSERT INTO user_boardgame_list ("user_id", "boardgame_id")
  VALUES ($1, $2);
  `;

  pool.query(queryText, [user, gameId])
    .then(response => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error adding game to collection. Error:', error);
    })
});

module.exports = router;
