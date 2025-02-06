import getPool from "../db/getPool.js";

const validateFilesMiddleware = async (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ error: "No files uploaded" });
		}

		const pool = await getPool();
		const [allowedMediaTypes] = await pool.query("SELECT mimeType, id FROM mediaTypes");

		const allowedMimeTypes = allowedMediaTypes.map((type) => type.mimeType);

		const files = Object.values(req.files);
		for (const file of files) {
			if (!allowedMimeTypes.includes(file.mimetype)) {
				return res.status(400).json({ error: `Invalid file type: ${file.mimetype}` });
			} else allowedMimeTypes.includes(file.mimetype);
			file.mediaType_id = allowedMediaTypes.find((type) => type.mimeType === file.mimetype).id;
		}

		next();
	} catch (err) {
		console.error(err);
		next(err);
	}
};

export default validateFilesMiddleware;
