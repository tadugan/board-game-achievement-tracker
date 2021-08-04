const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all boardgames
 * /boardgame returns a list of all supported boardgames in alphabetical order
 */
router.get('/', (req, res) => {
  let queryText = `
  SELECT *
  FROM "boardgame"
  ORDER BY name ASC;
  `;

  pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    })
    .catch(error => {
        console.log('Error getting all boardgames. Error:', error);
    });
});

/**
 * GET details for one boardgame
 * /boardgame/:id returns the details for one boardgame
 */
 router.get('/:id', (req, res) => {
  const gameId = req.params.id;
  
  let queryText = `
  SELECT * 
  FROM boardgame
  WHERE id = $1;
  `;

  pool.query(queryText, [gameId])
    .then(response => {
        res.send(response.rows);
    })
    .catch(error => {
        console.log('Error getting board game details. Error:', error);
    });
});

/**
 * POST route
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
