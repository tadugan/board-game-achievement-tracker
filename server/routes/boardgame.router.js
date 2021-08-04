const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
