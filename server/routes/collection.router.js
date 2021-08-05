const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 * Add a game and all of it's achievements to the user's collection
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const gameId = req.body.id;
  const user = req.user.id;
  const achievements = req.body.achievements;

  const queryTextAddGame = `
  INSERT INTO user_boardgame_list ("user_id", "boardgame_id")
  VALUES ($1, $2);
  `;

  const queryTextAddAchievements = `
  INSERT INTO user_achievement_list ("user_id", "achievement_id")
  VALUES ($1, $2);
  `;

  // Add a game to the user's collection
  pool.query(queryTextAddGame, [user, gameId])
    .then(response => {
        // If the game was added, add all associated achievements
        for (let achievement of achievements) {
            pool.query(queryTextAddAchievements, [user, achievement.id])
                .then(response => {
                    res.sendStatus(201);
                })
                .catch(error => {
                    console.log('Error adding achievements to Database. Error', error);
                    res.sendStatus(500);
                })
        }

        // send 200 OK
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error adding game to collection. Error:', error);
        res.sendStatus(500);
    })
});

module.exports = router;
