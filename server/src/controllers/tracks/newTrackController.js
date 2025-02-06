import uuid4 from "uuid4";
import { newTrackModel, insertGenreModel, insertFileModel } from "../../models/tracks/index.js";

const newTrackController = async (req, res, next) => {
	try {
		//Schema validation
		//await validateSchema(newTrackSchema, req.body);
		const { title, description, genreId } = req.body;
		const userId = req.user.id;
		const trackId = uuid4();

		await newTrackModel(trackId, userId, title, description);

		await insertGenreModel(genreId, trackId);

		const audioFile = req.files.audio;
		const photoFile = req.files.photo;
		const videoFile = req.files.video || null;

		await insertFileModel(audioFile, photoFile, videoFile, trackId);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default newTrackController;
