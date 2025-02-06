import getPool from "../../db/getPool.js";

const newTrackModel = async (trackId, userId, title, description) => {
	try {
		const pool = await getPool();
		const [track] = await pool.query(`INSERT INTO tracks (id, user_id, title, description) VALUES (?, ?, ?, ?)`, [
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

export default newTrackModel;
