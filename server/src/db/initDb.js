import mysql from "mysql2/promise";
import getPool from "./getPool.js";
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } from "../../env.js";

const createDatabase = async () => {
	try {
		const connection = await mysql.createConnection({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
		});

		await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

		await connection.end();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const createTables = async () => {
	try {
		await createDatabase();
		const pool = await getPool();
		await pool.query("DROP TABLE IF EXISTS users, tracks, playlists, comments, followers, likes, playlist_tracks;");

		console.log("Creating tables...");

		await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(60) NOT NULL UNIQUE,
            email VARCHAR(60) NOT NULL UNIQUE,
            password VARCHAR(60) NOT NULL,
			avatar VARCHAR(100),
			role ENUM('user', 'admin') DEFAULT 'user',
			registrationCode CHAR(30),
			active BOOLEAN DEFAULT false,
			recoverPassCode CHAR(10),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

		await pool.query(`
            CREATE TABLE IF NOT EXISTS tracks (
    		id BIGINT AUTO_INCREMENT PRIMARY KEY,
    		user_id BIGINT,
    		title VARCHAR(100) NOT NULL,
    		description VARCHAR(100),
    		audio_file TEXT NOT NULL,
    		visibility ENUM('public', 'private') NOT NULL DEFAULT 'public',
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		FOREIGN KEY (user_id) REFERENCES users(id)
)`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS trackFiles (
			id BIGINT AUTO_INCREMENT PRIMARY KEY,
			track_id BIGINT,
			audio_file TEXT NOT NULL,
			photo_file TEXT NOT NULL,
			video_file TEXT,
			FOREIGN KEY (track_id) REFERENCES tracks(id)
)`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS genres (
			id BIGINT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(100) NOT NULL
)`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS track_genres (
			track_id BIGINT,
			genre_id BIGINT,
			PRIMARY KEY (track_id, genre_id),
			FOREIGN KEY (track_id) REFERENCES tracks(id),
			FOREIGN KEY (genre_id) REFERENCES genres(id)
)`);

		await pool.query(`
			CREATE TABLE IF NOT EXISTS playlist_genres (
        	playlist_id BIGINT,
        	genre_id BIGINT,
        	PRIMARY KEY (playlist_id, genre_id),
        	FOREIGN KEY (playlist_id) REFERENCES playlists(id),
        	FOREIGN KEY (genre_id) REFERENCES genres(id)
)`);

		await pool.query(`
            CREATE TABLE IF NOT EXISTS playlists (
    		id BIGINT AUTO_INCREMENT PRIMARY KEY,
    		user_id BIGINT,
    		name VARCHAR(100) NOT NULL,
    		visibility ENUM('public', 'private') NOT NULL DEFAULT 'public',
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		FOREIGN KEY (user_id) REFERENCES users(id)
)`);
		await pool.query(`
            CREATE TABLE IF NOT EXISTS playlist_tracks (
			playlist_id BIGINT,
			track_id BIGINT,
			position INT DEFAULT NULL,
			added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (playlist_id, track_id),
			FOREIGN KEY (playlist_id) REFERENCES playlists(id),
			FOREIGN KEY (track_id) REFERENCES tracks(id)
)`);
		// Crear índices individuales
		await pool.query(`
            CREATE INDEX idx_playlist_tracks_playlist_id ON playlist_tracks(playlist_id);
        `);
		await pool.query(`
            CREATE INDEX idx_playlist_tracks_track_id ON playlist_tracks(track_id);
        `);

		await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
    		id BIGINT AUTO_INCREMENT PRIMARY KEY,
    		user_id BIGINT,
    		track_id BIGINT,
    		content VARCHAR(100) NOT NULL,
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		FOREIGN KEY (user_id) REFERENCES users(id),
    		FOREIGN KEY (track_id) REFERENCES tracks(id)
)`);

		await pool.query(`
            CREATE TABLE IF NOT EXISTS followers (
    		id BIGINT AUTO_INCREMENT PRIMARY KEY,
    		follower_id BIGINT,
    		followed_id BIGINT,
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		FOREIGN KEY (follower_id) REFERENCES users(id),
    		FOREIGN KEY (followed_id) REFERENCES users(id)
)`);

		await pool.query(`
            CREATE TABLE IF NOT EXISTS likes (
			id BIGINT AUTO_INCREMENT PRIMARY KEY,
			value TINYINT UNSIGNED NOT NULL,
			user_id BIGINT,
			track_id BIGINT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id),
			FOREIGN KEY (track_id) REFERENCES tracks(id)
)`);
		// Crear trigger para validar visibilidad (opcional)
		await pool.query(`
            CREATE TRIGGER validate_visibility BEFORE INSERT ON playlist_tracks
            FOR EACH ROW
            BEGIN
                DECLARE playlist_visibility ENUM('public', 'private');
                DECLARE track_visibility ENUM('public', 'private');

                SELECT visibility INTO playlist_visibility FROM playlists WHERE id = NEW.playlist_id;
                SELECT visibility INTO track_visibility FROM tracks WHERE id = NEW.track_id;

                IF playlist_visibility = 'private' AND track_visibility = 'public' THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Public tracks cannot be added to private playlists.';
                END IF;
            END;
        `);

		console.log("Tables created!");
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

createTables();
