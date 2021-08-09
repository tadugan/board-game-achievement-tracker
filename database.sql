-- UPDATED SQL

-- "user" table

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000),
    "first_name" VARCHAR (50),
    "last_name" VARCHAR (50),
    "authority" INT DEFAULT 0,
    "current_favorite_game" VARCHAR (255),
    "profile_image_url" VARCHAR (1000),
    "setting_display_order" VARCHAR (20),
    "setting_display_difficulty" VARCHAR (20),
    "setting_display_game_id" INT DEFAULT 0,
    "setting_profile_privacy" VARCHAR (10)
);

-- join table for "user" and "boardgame"

CREATE TABLE "user_boardgame_list" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user"("id"),
	"boardgame_id" INT REFERENCES "boardgame"("id")
);

-- "boardgame" table for all supported boardgames

CREATE TABLE "boardgame" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"publisher" VARCHAR (255),
	"description" VARCHAR (255),
	"image_url" VARCHAR (255)
);

-- "achievement" table

CREATE TABLE "achievement" (
	"id" SERIAL PRIMARY KEY,
	"boardgame_id" INT REFERENCES "boardgame"("id"),
	"title" VARCHAR (255),
	"requirement" VARCHAR (255),
	"difficulty" VARCHAR (20)
);


-- "user_achievement_list" table

CREATE TABLE "user_achievement_list" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user"("id"),
	"achievement_id" INT REFERENCES "achievement"("id"),
	"completed" BOOLEAN DEFAULT false,
	"date_completed" TIMESTAMP,
	"boardgame_id" INT REFERENCES "boardgame"("id")
);

DROP TABLE user_achievement_list;

-- SELECT

SELECT * FROM "user";

SELECT * FROM "user_boardgame_list";

SELECT * FROM "boardgame";

SELECT * FROM "achievement";

SELECT * FROM "user_achievement_list";

-- update details for user where id is 1
UPDATE "user"
SET first_name = 'Tim', last_name = 'Dugan', current_favorite_game = 'Root', profile_image_url = 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk', setting_display_order = 'ASC', setting_display_difficulty = 'any', setting_display_game_id = 1, setting_profile_privacy = 'public'
WHERE id = 1;

-- add an image url to a boardgame
UPDATE "boardgame"
SET image_url = 'https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__opengraph/img/_PznTHzy-oaTKt6SEVzuhxcCRsw=/fit-in/1200x630/filters:strip_icc()/pic3918905.png'
WHERE id = 5;

-- boardgame test data
INSERT INTO "boardgame" ("name", "publisher", "description")
	VALUES ('CATAN', 'Asmodee NA', 'CATAN description'), -- id 1 CATAN
	('X-wing', 'Atomic Mass Games', 'X-wing description'), -- id 2 X-wing
	('Root', 'Leder Games', 'Root description'),			-- id 3 Root
	('Marvel Champions', 'Fantasy Flight Games', 'Marvel Champions description'), -- id 4 Marvel Champions
	('Everdell', 'Starling Games', 'Everdell description'); -- id 5 Everdell

-- generic test data for achievements
INSERT INTO "achievement" ("boardgame_id", "title", "requirement", "difficulty")
	VALUES ('1', 'CATAN achievement 1', 'CATAN requirement 1', 'easy'),
	('1', 'CATAN achievement 2', 'CATAN requirement 2', 'moderate'),
	('1', 'CATAN achievement 3', 'CATAN requirement 3', 'hard'),
	('2', 'X-wing achievement 1', 'X-wing requirement 1', 'easy'),
	('2', 'X-wing achievement 2', 'X-wing requirement 2', 'moderate'),
	('2', 'X-wing achievement 3', 'X-wing requirement 3', 'hard'),
	('3', 'Root achievement 1', 'Root requirement 1', 'easy'),
	('3', 'Root achievement 2', 'Root requirement 2', 'moderate'),
	('3', 'Root achievement 3', 'Root requirement 3', 'hard'),
	('4', 'Marvel Champions achievement 1', 'Marvel Champions requirement 1', 'easy'),
	('4', 'Marvel Champions achievement 2', 'Marvel Champions requirement 2', 'moderate'),
	('4', 'Marvel Champions achievement 3', 'Marvel Champions requirement 3', 'hard'),
	('5', 'Everdell achievement 1', 'Everdell requirement 1', 'easy'),
	('5', 'Everdell achievement 2', 'Everdell requirement 2', 'moderate'),
	('5', 'Everdell achievement 3', 'Everdell requirement 3', 'hard');
	
-- Add some completed achievements to user id 1

INSERT INTO "user_achievement_list" ("user_id", "achievement_id", "completed", "date_completed")
	VALUES (1, 1, true, CURRENT_DATE),
	(1, 2, true, CURRENT_DATE),
	(1, 3, false, CURRENT_DATE),
	(1, 7, true, CURRENT_DATE),
	(1, 8, true, CURRENT_DATE),
	(1, 9, true, CURRENT_DATE),
	(1, 13, true, CURRENT_DATE),
	(1, 14, false, CURRENT_DATE),
	(1, 15, false, CURRENT_DATE);
	
-- get 4 most recent achievements for a user

SELECT boardgame.name, achievement.title
FROM user_achievement_list
JOIN "user" ON user_achievement_list.user_id = "user".id
JOIN achievement ON user_achievement_list.achievement_id = achievement.id
JOIN boardgame ON achievement.boardgame_id = boardgame.id
WHERE user_id = 1 AND completed = true
ORDER BY date_completed LIMIT 4;

-- Select all games from "boardgame"
SELECT *
FROM "boardgame"
ORDER BY name ASC;

-- Select a Game and all of it's details

SELECT * 
FROM boardgame
WHERE id = 1;

-- Select all achievement from 1 game
SELECT achievement.title, achievement.requirement, achievement.difficulty, achievement.id
FROM achievement
JOIN boardgame ON achievement.boardgame_id = boardgame.id
WHERE boardgame_id = 1
ORDER BY achievement.id ASC;

-- Add a game to the user's collection
INSERT INTO user_boardgame_list ("user_id", "boardgame_id")
	VALUES ('1', '1');

SELECT * FROM "user_boardgame_list";

SELECT * FROM "user_achievement_list";

DELETE FROM "user_boardgame_list" WHERE user_id = 1;

DELETE FROM "user_achievement_list" WHERE user_id = 1;

-- Add an achievement to the user_achievement_list
INSERT INTO user_achievement_list ("user_id", "achievement_id", "boardgame_id")
	VALUES ('2', '1', '1'),
	('2', '2', '1'),
	('2', '3', '1'),
	('2', '4', '1'),
	('2', '5', '1'),
	('2', '6', '1');
	
-- Select all games in a users collection
SELECT boardgame.id, boardgame.publisher, boardgame.description, boardgame.image_url, boardgame.id
FROM user_boardgame_list
JOIN boardgame ON user_boardgame_list.boardgame_id = boardgame.id
WHERE user_id = 1
ORDER BY boardgame."name" ASC;

-- Select all of a users achievements for one game
SELECT achievement.id, user_achievement_list.completed, user_achievement_list.date_completed, achievement.title, achievement.requirement, achievement.difficulty, achievement.boardgame_id
FROM user_achievement_list
JOIN achievement ON user_achievement_list.achievement_id = achievement.id
WHERE user_id = 1 AND achievement.boardgame_id = 2;

-- Update a table to mark an achievement as complete
UPDATE user_achievement_list
SET completed = true
WHERE user_id = 1 AND achievement_id = 2;

UPDATE user_achievement_list
SET completed = false
WHERE user_id = 1;

-- DELETE a game from a user's collection
DELETE
FROM user_boardgame_list
WHERE user_id = 1 AND boardgame_id = 1;

-- DELETE all user achievements for one game
DELETE
FROM user_achievement_list
WHERE user_id = 2 AND boardgame_id = 1;

SELECT * FROM "user_achievement_list";
SELECT * FROM "user_boardgame_list";
