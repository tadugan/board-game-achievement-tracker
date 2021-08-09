const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET
 * Returns all games in a user's collection
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  
  const user = req.user.id;

  const queryText = `
  SELECT boardgame.name, boardgame.publisher, boardgame.description, boardgame.image_url, boardgame.id
  FROM user_boardgame_list
  JOIN boardgame ON user_boardgame_list.boardgame_id = boardgame.id
  WHERE user_id = $1
  ORDER BY boardgame."name" ASC;
  `;

  pool.query(queryText, [user])
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.log('Error retrieving user collection. Error:', error);
      res.sendStatus(500);
    })

});

/**
 * POST
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
  INSERT INTO user_achievement_list ("user_id", "achievement_id", "boardgame_id")
  VALUES ($1, $2, $3);
  `;

  // Add a game to the user's collection
  pool.query(queryTextAddGame, [user, gameId])
    .then(response => {
        // If the game was added, add all associated achievements
        for (const i in achievements) {
            pool.query(queryTextAddAchievements, [user, achievements[i].id, gameId])
                .then(response => {
                    console.log(`sending request ${Number(i) + 1} of ${achievements.length}`); // test
                    if ( Number(i)+1 === achievements.length) {
                      console.log('SENDING STATUS'); 
                      res.sendStatus(201);
                    }
                })
                .catch(error => {
                    console.log('Error adding achievements to Database. Error', error);
                    res.sendStatus(500);
                })
        }
    })
    .catch(error => {
        console.log('Error adding game to collection. Error:', error);
        res.sendStatus(500);
    })
});

/**
 * DELETE
 * Remove a game and all of it's achievements from a user's collection
 */
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const gameId = req.params.id;
    const user = req.user.id; 

    const queryTextDeleteGame = `
    DELETE
    FROM user_boardgame_list
    WHERE user_id = $1 AND boardgame_id = $2;
    `;

    const queryTextDeleteAchievements = `
    DELETE
    FROM user_achievement_list
    WHERE user_id = $1 AND boardgame_id = $2;
    `;

    // DELETEs a game from a user's collection
    pool.query(queryTextDeleteGame, [user, gameId])
      .then(response => {
        // DELETEs all achievements associated with that game that was deleted
        pool.query(queryTextDeleteAchievements, [user, gameId])
          .then(response => {
            res.sendStatus(204);
          })
          .catch(error => {
            console.log('Error deleting achievements from user collection. Error:', error);
            res.sendStatus(500);
          });
      })
      .catch(error => {
        console.log('Error deleting game from user collection. Error:', error);
        res.sendStatus(500);
      });
});


module.exports = router;
