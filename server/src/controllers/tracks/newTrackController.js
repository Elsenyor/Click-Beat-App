import uuid4 from "uuid4";

const newTrackController = async (req, res, next) => {
	try {
		//Schema validation
		//await validateSchema(newTrackSchema, req.body);
		const { title, description, genre } = req.body;
		const userId = req.user.id;
		const trackId = uuid4();

		await insertTrackModel(trackId, userId, title, description);

		let files = [];

		if (req.files) {
			// If there are audio and photo files must separate them to store them in different collections
			files = req.files;

			const audioFile = files.find((file) => file.fieldname === "audio");
			const photoFile = files.find((file) => file.fieldname === "photo");
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default newTrackController;
