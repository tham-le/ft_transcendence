BEGIN;

DROP TABLE IF EXISTS
"user", "game", "stats_game", "party", "list_friends", "stats_user_by_game";

-- --------------------------------------------------------------------------
-- Table user
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
	"id_user" SERIAL PRIMARY KEY,
	"login" VARCHAR(50) NOT NULL,
	"email" VARCHAR(50) NOT NULL,
	"password" VARCHAR(50) NOT NULL,
	"frist_name" VARCHAR(50) NULL,
	"last_name" VARCHAR(50) NULL,
	"is_admin" BOOLEAN DEFAULT FALSE,
	"sexe" VARCHAR(50) NOT NULL,
	"age" INTEGER NOT NULL,
	"token" VARCHAR(50) NULL,
	"avatar" VARCHAR(255) NOT NULL DEFAULT '/var/www/default_avatar.webp',
	"status" VARCHAR(50) NOT NULL DEFAULT 'offline',
	"date_creation" TIMESTAMP NOT NULL,
	"date_last_connection" TIMESTAMP NOT NULL,
	-- la table list_friend n'existe pas encore
	-- on va ajouter une modification a la fin du script pour ajoute la reference
	-- "list_friends_id" integer NOT NULL REFERENCES list_friends(id_list_friend)
	"id_list_friend" INTEGER NULL
);
-- --------------------------------------------------------------------------
-- Table game
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "game" (
	"id_game" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"image" VARCHAR(255) NOT NULL DEFAULT '/var/www/default_game.webp',
	"dascritpion" VARCHAR(1024) NOT NULL,
	"genre" VARCHAR(50) NULL
);
-- --------------------------------------------------------------------------
-- Table stats_game
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "stats_game" (
	"id_stats_game" SERIAL PRIMARY KEY,
	"nb_player" INTEGER NOT NULL,
	"time_played" INTEGER NOT NULL,
	"nb_party" INTEGER NOT NULL,
	"id_game" INTEGER NOT NULL REFERENCES game("id_game")
);
-- --------------------------------------------------------------------------
-- Table party
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "party" (
	"id_party" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"is_full" BOOLEAN DEFAULT FALSE,
	"time_start" TIMESTAMP NOT NULL,
	"time_end" TIMESTAMP NOT NULL,
	"status" VARCHAR(50) NOT NULL DEFAULT 'waiting',
	"score" INTEGER NOT NULL,
	"id_game" INTEGER NOT NULL REFERENCES "game"("id_game"),
	"id_user1" INTEGER NOT NULL REFERENCES "user"("id_user"),
	"id_user2" INTEGER NOT NULL REFERENCES "user"("id_user"),
	"id_winner" INTEGER NOT NULL REFERENCES "user"("id_user"),
	"id_looser" INTEGER NOT NULL REFERENCES "user"("id_user")
);
-- --------------------------------------------------------------------------
-- Table list_friends
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "list_friends" (
	"id_list_friend" SERIAL PRIMARY KEY,
	-- need to improve maybe
	"id_user" INTEGER NOT NULL REFERENCES "user"("id_user"),
	"id_friend" INTEGER NOT NULL REFERENCES "user"("id_user"),
	UNIQUE ("id_user", "id_friend")
);

-- --------------------------------------------------------------------------
-- Table stats_user_by_game
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "stats_user_by_game" (
	"id_stats_user_by_game" SERIAL PRIMARY KEY,
	"id_user" INTEGER NOT NULL REFERENCES "user"("id_user"),
	"id_game" INTEGER NOT NULL REFERENCES "game"("id_game"),
	"time_played" INTEGER NOT NULL DEFAULT 0,
	"wins" INTEGER NOT NULL DEFAULT 0,
	"looses" INTEGER NOT NULL DEFAULT 0,
	"nb_played" INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE "user" ADD CONSTRAINT "user_id_list_friend_fkey" FOREIGN KEY ("id_list_friend") REFERENCES "list_friends" ("id_list_friend") ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
