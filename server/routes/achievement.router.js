const express = require('express');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/profile', rejectUnauthenticated, (req, res) => {
    const user = req.user;
    const queryText = `
    SELECT boardgame.name, achievement.title
    FROM user_achievement_list
    JOIN "user" ON user_achievement_list.user_id = "user".id
    JOIN achievement ON user_achievement_list.achievement_id = achievement.id
    JOIN boardgame ON achievement.boardgame_id = boardgame.id
    WHERE user_id = 1 AND completed = true
    ORDER BY date_completed LIMIT 4;
    `;

    pool.query(queryText)
        .then(response => {
            console.log('Response is:', response); // test
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error getting achievements for profile. Error:', error);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
