import getPool from "../../db/getPool.js";

const insertFileModel = async (audioFile, photoFile, videoFile, trackId) => {
	const pool = await getPool();
	await pool.query(`INSERT INTO track_audio (audio_file, mediaType_id, track_id) VALUES (?, ?, ?)`, [audioFile, mediaTypeId, trackId]);

	if (photoFile) {
		await pool.query(`INSERT INTO track_photo (photo_file, mediaType_id, track_id) VALUES (?, ?, ?)`, [photoFile, mediaTypeId, trackId]);
	}
	if (videoFile) {
		await pool.query(`INSERT INTO track_video (video_file, mediaType_id, track_id) VALUES (?, ?, ?)`, [videoFile, mediaTypeId, trackId]);
	}
};

export default insertFileModel;
