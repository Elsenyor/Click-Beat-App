import getPool from "../../db/getPool.js";

const insertTrackModel = async (trackId, userId, title, description, genre) => {
	try {
		const pool = await getPool();
		const [track] = await pool.query(`INSERT INTO tracks (track_id, user_id, title, description) VALUES (?, ?, ?, ?)`, [
			trackId,
			userId,
			title,
			description,
		]);

		return track;
	} catch (err) {
		throw new Error(err);
	}
};

export default insertTrackModel;
