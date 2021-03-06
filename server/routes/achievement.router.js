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
    SELECT boardgame.name, achievement.title, boardgame.id, achievement.difficulty, user_achievement_list.date_completed
    FROM user_achievement_list
    JOIN "user" ON user_achievement_list.user_id = "user".id
    JOIN achievement ON user_achievement_list.achievement_id = achievement.id
    JOIN boardgame ON achievement.boardgame_id = boardgame.id
    WHERE user_id = $1 AND completed = true
    ORDER BY user_achievement_list.date_completed DESC LIMIT 3;
    `;

    pool.query(queryText, [user.id])
        .then(response => {
            console.log('Response is:', response); // test
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error getting achievements for profile. Error:', error);
            res.sendStatus(500);
        });
});

/**
 * GET
 * /achievement/:id returns the achievements for one boardgame
 */
 router.get('/:id', (req, res) => {
  const gameId = req.params.id;
  
  let queryText = `
  SELECT achievement.title, achievement.requirement, achievement.difficulty, achievement.id
  FROM achievement
  JOIN boardgame ON achievement.boardgame_id = boardgame.id
  WHERE boardgame_id = $1
  ORDER BY achievement.id ASC;
  `;

  pool.query(queryText, [gameId])
    .then(response => {
        res.send(response.rows);
    })
    .catch(error => {
        console.log('Error getting board game achievements. Error:', error);
        res.sendStatus(500);
    });
});

/**
 * GET
 * /achievement/:id returns the user's achievements for one boardgame
 */
 router.get('/user/:id', rejectUnauthenticated, (req, res) => {
    const gameId = req.params.id;
    const user = req.user.id;

    let queryText = `
    SELECT achievement.id, user_achievement_list.completed, user_achievement_list.date_completed, achievement.title, achievement.requirement, achievement.difficulty, achievement.boardgame_id
    FROM user_achievement_list
    JOIN achievement ON user_achievement_list.achievement_id = achievement.id
    WHERE user_id = $1 AND achievement.boardgame_id = $2;
    `;
  
    pool.query(queryText, [user, gameId])
      .then(response => {
          res.send(response.rows);
      })
      .catch(error => {
          console.log('Error getting user achievements for one game. Error:', error);
          res.sendStatus(500);
      });
  });


/**
 * PUT
 * Mark a single achievement as complete
 */
router.put('/user/complete/:id', rejectUnauthenticated, (req, res) => {
  const achievementId = req.params.id;
  const user = req.user.id;

  let queryText = `
  UPDATE user_achievement_list
  SET completed = true, date_completed = current_timestamp
  WHERE user_id = $1 AND achievement_id = $2;
  `;

  pool.query(queryText, [user, achievementId])
    .then(response => {
        res.sendStatus(204);
    })
    .catch(error => {
        res.sendStatus(500);
    })
});

module.exports = router;
