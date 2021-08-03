
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

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
	"description" VARCHAR (255)
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
	"date_completed" TIMESTAMP
);


SELECT * FROM "user";

SELECT * FROM "user_boardgame_list";

SELECT * FROM "boardgame";

SELECT * FROM "achievement";

SELECT * FROM "user_achievement_list";

-- update details for user where id is 1
UPDATE "user"
SET first_name = 'Tim', last_name = 'Dugan', current_favorite_game = 'Root', profile_image_url = 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk', setting_display_order = 'ASC', setting_display_difficulty = 'any', setting_display_game_id = 1, setting_profile_privacy = 'public'
WHERE id = 1;

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

    