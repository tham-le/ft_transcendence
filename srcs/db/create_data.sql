BEGIN;

-- Insertion de données dans la table "list_friends"
INSERT INTO "list_friends" ("id_user", "id_friend")
VALUES
(1, 2),
(2, 1);

-- Insertion de données dans la table "user"
INSERT INTO "user" ("login", "email", "password", "frist_name", "last_name", "sexe", "age", "date_creation", "date_last_connection", "id_list_friend")
VALUES
('user1', 'user1@email.com', 'password1', 'User', 'One', 'Male', 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('user2', 'user2@email.com', 'password2', 'User', 'Two', 'Female', 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);

-- Insertion de données dans la table "game"
INSERT INTO "game" ("name", "dascritpion")
VALUES
('Game1', 'Description for Game1'),
('Game2', 'Description for Game2');

-- Insertion de données dans la table "party"
INSERT INTO "party" ("name", "time_start", "time_end", "score", "id_game", "id_user1", "id_user2", "id_winner", "id_looser")
VALUES
('Party1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 100, 1, 1, 2, 1, 2);

-- Insertion de données dans la table "stats_game"
INSERT INTO "stats_game" ("nb_player", "time_played", "nb_party", "id_game")
VALUES
(2, 120, 1, 1);

-- Insertion de données dans la table "stats_user_by_game"
INSERT INTO "stats_user_by_game" ("id_user", "id_game")
VALUES
(1, 1),
(2, 1);

COMMIT;
