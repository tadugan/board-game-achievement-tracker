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
    "setting_display_order" VARCHAR (20) DEFAULT 'ASC',
    "setting_display_difficulty" VARCHAR (20) DEFAULT 'any',
    "setting_display_game_id" INT DEFAULT 0,
    "setting_profile_privacy" VARCHAR (10) DEFAULT 'private'
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
	"description" VARCHAR (1000),
	"image_url" VARCHAR (1000)
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

-- boardgame data
INSERT INTO "boardgame" ("name", "publisher", "description", "image_url")
	VALUES ('CATAN', 'Asmodee NA', 'CATAN description', 'https://upload.wikimedia.org/wikipedia/en/a/a3/Catan-2015-boxart.jpg'), -- id 1 CATAN
	('X-wing', 'Atomic Mass Games', 'X-wing description', 'https://images-cdn.fantasyflightgames.com/filer_public/ed/f7/edf7085c-cd9d-4c99-9767-6c115ac58127/swz01_box_right.png'), -- id 2 X-wing
	('Root', 'Leder Games', 'Root description', 'https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__opengraph/img/QypoNrQX9tNBA-A-W9uTvm_eNBM=/fit-in/1200x630/filters:strip_icc()/pic4254509.jpg'),			-- id 3 Root
	('Marvel Champions', 'Fantasy Flight Games', 'Marvel Champions description', 'https://cf.geekdo-images.com/kRvUgYiaOq07kC67ZK5UoQ__opengraph/img/mRM4HyXvEdJ2XJJNxo1RdJpVkig=/fit-in/1200x630/filters:strip_icc()/pic4900321.jpg'), -- id 4 Marvel Champions
	('Everdell', 'Starling Games', 'Everdell description', 'https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__opengraph/img/_PznTHzy-oaTKt6SEVzuhxcCRsw=/fit-in/1200x630/filters:strip_icc()/pic3918905.png'); -- id 5 Everdell

-- Insert testing data for achievements
INSERT INTO "achievement" ("boardgame_id", "title", "requirement", "difficulty")
	VALUES ('1', 'A Humble Village', 'Win a game without any Cities', 'hard'),
	('1', 'The Road Less Traveled', 'Control a road that is unbroken and 15 segments long', 'moderate'),
	('1', 'A Bad Deal', 'Trade at least 4 of one resource type other player(s) in one turn, then reclaim them with a Monopoly card. ', 'moderate'),
	('1', 'An Empire', 'Win a game with the Longest Road and Largest Army.', 'easy'),
	('1', 'Fledgling Seafarer', 'Control at least 3 ports.', 'moderate'),
	('2', 'Rookies', 'Win a game without having any unique character in your squad list.', 'moderate'),
	('2', 'I got one!', 'Destroy a full health Tie Fighter with one shot', 'moderate'),
	('2', 'Use the Force', 'Hit a target with a Torpedo or Missile fired using Instinctive Aim.', 'easy'),
	('2', 'That was too close...', 'Win a game with only 1 ship, with 1 hit point remaining.', 'hard'),
	('2', 'I''ve got a bad feeling about this', 'Win a game where all the opposing ships'' initiatives are higher than your own.', 'hard'),
	('5', 'The Royal Family', 'Win a game with the King, the Queen, the Castle, and the Palace in your city.', 'hard'),
	('5', 'Under the Evertree', 'Build the Evertree', 'easy'),
	('5', 'No time for jokes', 'Put the Fool into the Dungeon', 'easy'),
	('5', 'Family Frenzy', 'Have 3 Wife/Husband pairs in your city.', 'moderate'),
	('5', 'Overachiever', 'Claim 3 special events in one game', 'moderate'),
	('4', 'Age of Ultron', 'Defeat Ultron on Expert Mode', 'hard'),
	('4', 'Avenger''s Assemble', 'Win a game where each player only used Heroes and Allies with the "Avenger" trait', 'moderate'),
	('4', 'She-Hulk Smash', 'Deal 15 Damage with "Gamma Slam"', 'moderate'),
	('4', 'My Spider-Sense is Tingling', 'Use "Enhanced Spider-sense" to cancel the effects of "Shadow of the Past"', 'easy'),
	('4', 'Just the Beginning...', 'Defeat Rhino on any difficulty', 'easy'),
	('3', 'If I fits, I sits', 'Win a game as the Marquise de Cat', 'moderate'),
	('3', 'All Alone', 'Win a game as the Vagabond', 'moderate'),
	('3', 'A Forest United', 'Win a game as the Woodland Alliance', 'moderate'),
	('3', 'The Empire Strikes Back', 'Win a game as the Eyrie Dynasties', 'moderate'),
	('3', 'Dominance', 'Win a game with a Dominance card', 'hard');

