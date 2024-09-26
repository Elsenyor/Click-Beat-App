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
);`);

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
            CREATE TABLE IF NOT EXISTS playlists (
    		id BIGINT AUTO_INCREMENT PRIMARY KEY,
    		user_id BIGINT,
    		name VARCHAR(100) NOT NULL,
    		visibility VARCHAR(100) NOT NULL DEFAULT 'public',
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		FOREIGN KEY (user_id) REFERENCES users(id)
)`);

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
		await pool.query(`
            CREATE TABLE IF NOT EXISTS playlist_tracks (
			playlist_id BIGINT,
			track_id BIGINT,
			added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (playlist_id, track_id),
			FOREIGN KEY (playlist_id) REFERENCES playlists(id),
			FOREIGN KEY (track_id) REFERENCES tracks(id)
)`);
		console.log("Tables created!");
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

createTables();
